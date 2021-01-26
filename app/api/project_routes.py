import pickle
from faker import Faker
from datetime import datetime
from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from datetime import datetime
from app.forms import ProjectForm
from app.models import Project, User, DataSet, Survey, db
from app.api import validation_errors_to_error_messages
from .data_processing import data_processing_for_survey_records
from sqlalchemy.orm import joinedload

fake = Faker()
project_routes = Blueprint("projects", __name__)


@project_routes.route("/")
@login_required
def all_projects():
    user = db.session.query(User).get(current_user.get_id()).to_dict()
    if user["type_id"] == 1:
        projects = db.session.query(Project).options(joinedload(Project.surveys)).all()
    if user["type_id"] == 2:
        projects = db.session.query(Project).filter_by(user_id = user["id"]).all()
    return jsonify([project.to_dict_survey_summary() for project in projects])

@project_routes.route("/", methods=["POST"])
@login_required
def post_project():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            project_name=form.data['project_name'],
            data_set_id=form.data['data_set_id'],
            user_id=form.data['user_id'],
            target_health_area_count=form.data['target_health_area_count'],
            target_surv_count=form.data['target_surv_count'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(project)
        db.session.commit()
        project_id = db.session.query(Project.id).filter(Project.project_name==form.data['project_name']).first()[0]
        data_set = db.session.query(DataSet.data_set).filter(DataSet.id==form.data['data_set_id']).first()
        data_set = data_set._asdict()
        pickle_file = pickle.loads(data_set["data_set"])
        surveys = data_processing_for_survey_records(pickle_file)
        # Lay out the summary fields for projects
        enumerators = []
        health_areas = []
        health_area_count = 0
        enumerator_count = 0
        dont_know_count = 0
        outlier_count = 0
        sum_duration = float()
        # as the survey records are built, tabulate summary data for project
        for survey in surveys.values():
            if survey["enumerator_id"] not in enumerators:
                enumerator_count += 1
                enumerators.append(survey["enumerator_id"])
            if survey["health_area"] not in health_areas:
                health_area_count += 1
                health_areas.append(survey["health_area"])
            dont_know_count += int(float(str(survey["num_dont_know_responses"])))
            outlier_count += int(float(str(survey["num_outlier_data_points"])))
            sum_duration = sum_duration + float(str(survey["duration"]))
            # build the survey records & commit to DB
            survey_seed = Survey(
                health_area_id=int(survey["health_area"]),
                project_id=project_id,
                enumerator_id=survey["enumerator_id"],
                date_time_administered=survey["date_time_administered"],
                duration=survey["duration"],
                respondent=fake.name(),
                num_outlier_data_points=int(float(str(survey["num_outlier_data_points"]))),
                num_dont_know_responses=int(float(str(survey["num_dont_know_responses"]))),
                lat=survey["lat"],
                long=survey["long"],
                outside_health_zone=False
            ) 
            db.session.add(survey_seed)
        # Now that all survey records have been built, update the project
        avg_duration = float(sum_duration / len(surveys)) if len(surveys) else 0.00
        project = db.session.query(Project).options(joinedload("surveys")).get(project_id)
        project.survey_count = len(surveys)
        project.health_area_count = health_area_count
        project.enumerator_count = enumerator_count
        project.dont_know_count = dont_know_count
        project.outlier_count = outlier_count
        project.avg_duration = avg_duration
        db.session.commit()

        return project.to_dict_survey_summary()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# Specifically for returning values related to projects for search
@project_routes.route("/search")
@login_required
def search_projects():
    projects = db.session.query(Project).all()
    return jsonify([project.search() for project in projects])

# Get data for a single project
@project_routes.route("/<int:id>")
@login_required
def project(id):
    project = db.session.query(Project).options(joinedload("surveys")).get(id)
    return jsonify(project.to_dict_survey_summary())

# Updating a single project
@project_routes.route("/<int:id>", methods=["POST"])
@login_required
def update_project(id):
    project = db.session.query(Project).options(joinedload("surveys")).get(id)
    req = dict(request.json)
    project.project_name = req['project_name']
    project.target_health_area_count=req['target_health_area_count']
    project.target_surv_count=req['target_surv_count']
    project.updated_at = datetime.now()
    db.session.commit()
    project = db.session.query(Project).get(id)
    return jsonify(project.to_dict_survey_summary())

# Deleting a single project
@project_routes.route("/<int:projectId>", methods=["DELETE"])
@login_required
def delete_project(projectId):
    project = db.session.query(Project).get(projectId)
    db.session.delete(project)
    db.session.commit()
    return { projectId: "Successfully deleted" }


@project_routes.route("/<int:id>/surveys")
@login_required
def project_surveys(id):
    project = db.session.query(Project).options(joinedload(Project.surveys)).options(joinedload(Project.user)).get(id)
    return jsonify(project.to_dict_full())
