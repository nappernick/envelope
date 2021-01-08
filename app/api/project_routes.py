from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Project, db

project_routes = Blueprint("projects", __name__)


@project_routes.route("/")
@login_required
def all_projects():
    curr_user = current_user.to_dict()
    if curr_user["type_id"] != 1:
        return jsonify({
            "errors": [
                "Unauthorized"
            ]
        })
    projects = db.session.query(Project).all()
    return jsonify([project.to_dict() for project in projects])

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

