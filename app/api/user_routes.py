from datetime import datetime
from werkzeug.security import generate_password_hash
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required
from app.models import db, User, Type
from app.forms import UpdateUserForm
from .auth_routes import authenticate, validation_errors_to_error_messages

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


@user_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def user_delete(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return { id: "Successfully deleted" }


@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def user_update(id):
    user = User.query.options(joinedload("type")).get(id)
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("_______ FORM DATA",form.data)
        user.username=form.data['username'],
        user.email=form.data['email'],
        user.hashed_password=generate_password_hash(form.password.data),
        user.first_name=form.data['first_name'],
        user.last_name=form.data['last_name'],
        user.type_id=form.data['type_id'],
        user.updated_at=datetime.now()
        db.session.commit()
        return user.to_dict_full()
    return {'errors': validation_errors_to_error_messages(form.errors)}


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
