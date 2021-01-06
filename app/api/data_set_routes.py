from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, DataSet

data_set_routes = Blueprint('data', __name__)

@data_set_routes.route('/')
@login_required
def data():
    data = db.session.query(DataSet).all()

    return jsonify([data_set.to_dict() for data_set in data])

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
    # lets assume we're running this for interview duration.
    # We're going to need a list of the data points that make up the data
    # set's surveys, the min, max, and median
