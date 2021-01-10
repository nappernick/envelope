from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Project, User, db

project_routes = Blueprint("projects", __name__)


@project_routes.route("/")
# @login_required
def all_projects():
    user = db.session.query(User).get(current_user.get_id()).to_dict()
    if user["type_id"] == 1:
        projects = db.session.query(Project).all()
    if user["type_id"] == 2:
        projects = db.session.query(Project).filter_by(user_id = user["id"]).all()
    return jsonify([project.to_dict_survey_summary() for project in projects])

@project_routes.route("/search")
# @login_required
def search_projects():
    projects = db.session.query(Project).all()
    return jsonify([project.search() for project in projects])

@project_routes.route("/<int:id>")
@login_required
def project(id):
    project = db.session.query(Project).get(id)
    return jsonify(project.to_dict())


@project_routes.route("/<int:id>/surveys")
@login_required
def project_surveys(id):
    project = db.session.query(Project).get(id)
    return jsonify(project.to_dict_full())
