from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, DataSet

data_set_routes = Blueprint('data', __name__)

@data_set_routes('/')
@login_required
def data():
    data = db.session.query(DataSet).all()

    return jsonify([data_set.to_dict() for data_set in data])
