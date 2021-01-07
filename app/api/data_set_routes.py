from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, DataSet
from .auth_routes import authenticate
# from .data_processing import data_processing

data_set_routes = Blueprint('data', __name__)

@data_set_routes.route('/')
# @login_required
def data():
    data = db.session.query(DataSet).all()
    curr_user = current_user.to_dict()
    return jsonify(str(curr_user["id"]))
    # return jsonify([data_set.to_dict() for data_set in data])

@data_set_routes.route('/<dataSetId>/violinplot/<surveyField>')
@login_required
def violin_plot(dataSetId, surveyField):
    authenticated = authenticate()
    if authenticated["type_id"] != 1:
        return jsonify({
            "errors": [
                "Unauthorized"
            ]
        })
    
    curr_user = current_user.to_dict()
    # Approach one:
    surveys = db.session.query(DataSet).get(dataSetId).projects.filter_by(user_id=curr_user["id"]).first().surveys
    data_set_for_graph = []
    surveys_list = list(surveys)
    for survey in surveys_list:
        data_set_for_graph.append(survey.to_dict()[surveyField])
    # Approach two:
    data_set = db.session.query(DataSet).get(dataSetId)
    # Process binary back into csv:

    return jsonify(data_set_for_graph)
