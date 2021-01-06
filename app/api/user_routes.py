from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from .auth_routes import authenticate

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {**[user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route("/user/<int:id>/users")
# def admin_fetch_users(id):
