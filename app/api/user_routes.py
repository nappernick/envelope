from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Type
from .auth_routes import authenticate

user_routes = Blueprint('users', __name__)


@user_routes.route("/types")
def types():
    types = db.session.query(Type).all()
    return jsonify([type.name_to_id() for type in types])

@user_routes.route('/')
@login_required
def users():
    users = db.session.query(User).all()
    return jsonify([user.to_dict_full() for user in users])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<int:id>/clients")
@login_required
def admin_fetch_clients(id):
    authenticated = authenticate()
    clientUsers = db.session.query(User).filter_by(type_id=2).all()
    
    if authenticated["type_id"] != 1:
        return jsonify({
            "errors": [
                "Unauthorized"
            ]
        })
    return jsonify([user.to_dict_full() for user in clientUsers])
