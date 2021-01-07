from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Survey, db

survey_routes = Blueprint("surveys", __name__)


@survey_routes.route("/")
@login_required
def all_surveys():
    curr_user = current_user.to_dict()
    if curr_user["type_id"] != 1:
        return jsonify({
            "errors": [
                "Unauthorized"
            ]
        })
    surveys = db.session.query(Survey).all()
    return jsonify([survey.to_dict() for survey in surveys])

