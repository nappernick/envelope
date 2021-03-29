import os
import csv
import zipfile
import pickle
import threading
import pandas as pd
import numpy as np
import sys
# For API 
import pysurveycto
# Redis queue
from rq import Queue
from rq.job import Job
from app.redis import conn
# File reading utility
from io import BytesIO
from datetime import datetime
from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, DataSet, HealthArea, Survey, Project
from .auth_routes import authenticate
from sqlalchemy.orm import joinedload
from .data_processing import data_processing_for_survey_records, process_data_for_reader

data_set_routes = Blueprint('data', __name__)
# Redis job queue
q = Queue(connection=conn)

@data_set_routes.route('/data-sets')
@login_required
def data():
    curr_user = current_user.to_dict()
    if curr_user["type_id"] == 1: 
        data = db.session.query(DataSet).all()
        return jsonify([data_set.to_dict() for data_set in data])
    else:
        return {'errors': ['Unauthorized']}, 401

# Workaround for Heroku front-end to back-end open connections limited to 30 seconds
@data_set_routes.route("/upload", methods=['POST'])
@login_required
def data_file_upload():
    file = request.files['data-set']
    # print(file.content_type)
    types = ["application/zip", "text/csv", "application/octet-stream"]
    if (file and file.content_type in types):
        # try pympler profiler
        post_ds = threading.Thread(target = async_ds_post, args=[file])
        post_ds.start()
        return jsonify("Successful file upload.")
    else:
        return {"errors": ["Files were not successfully passed to the API."]}, 500

# Helper function to make the data-set upload with the frontend asynchronous for polling
def async_ds_post(file):
    import sys
    from app import app, db
    with app.app_context():
        file_name = file.filename
        file_name_list = file.filename.split(".")
        if file_name_list[len(file_name_list)-1] == "dta":
            data = pd.io.stata.read_stata(file)
            csv_file = data.to_csv()
            file_final = pickle.dumps(csv_file)

        elif file_name_list[len(file_name_list)-1] == "zip":
            file_like_object = BytesIO(file.read())
            zipfile_ob = zipfile.ZipFile(file_like_object)
            file_names = zipfile_ob.namelist()
            file_names = [file_name for file_name in file_names if not "__MACOSX/." in file_name]
            files = [zipfile_ob.open(name).read() for name in file_names]
            file_final = files[0].decode("utf-8")
            file_final = pickle.dumps(file_final)
        elif file_name_list[len(file_name_list)-1] == "csv":
            csv_file=file.read()
            file_final = pickle.dumps(csv_file)
        else:
            return {"errors": "This file type is not accepted, please only upload .dta, .csv, or .csv.zip file types."}
        data_set = DataSet(
            data_set_name=file_name,
            data_set=file_final
        )
        db.session.add(data_set)
        db.session.commit()
        sys.exit()
        return
    sys.exit()
    return 

@data_set_routes.route("/<int:dataSetId>", methods=["POST"])
@login_required
def update_data_set(dataSetId):
    data_set = db.session.query(DataSet).get(dataSetId)
    req = dict(request.json)
    data_set.data_set_name = req['data_set_name']
    data_set.updated_at = datetime.now()
    db.session.commit()
    return data_set.to_dict()

@data_set_routes.route("/<int:dataSetId>", methods=["DELETE"])
@login_required
def delete_data_set(dataSetId):
    data_set = db.session.query(DataSet).get(dataSetId)
    db.session.delete(data_set)
    db.session.commit()
    return { dataSetId: "Successfully deleted" }


@data_set_routes.route('/<int:dataSetId>/projects/<int:projectId>/violinplot/<surveyField>')
@login_required
def violin_plot(dataSetId, projectId, surveyField):
    curr_user = current_user.to_dict()
    if curr_user["type_id"] == 1:
        surveys_query = db.session.query(DataSet.id,\
            Survey.project_id,Survey.enumerator_id, Survey.health_area_id, \
            Survey.duration, Survey.date_time_administered, Survey.num_outlier_data_points, Survey.num_dont_know_responses\
            # If the user is admin, query only by data set & project id's
            ).filter(DataSet.id==dataSetId, Project.id ==projectId)\
            .join(Project, Project.data_set_id==DataSet.id)\
            .join(Survey, Survey.project_id==Project.id)
    else:
        surveys_query = db.session.query(DataSet.id,\
            Survey.project_id,Survey.enumerator_id, Survey.health_area_id, Survey.duration, \
            Survey.date_time_administered, Survey.num_outlier_data_points, Survey.num_dont_know_responses\
            # If the user isn't admin, query with current user id
            ).filter(DataSet.id==dataSetId, Project.user_id ==current_user.id, Project.id ==projectId)\
            .join(Project, Project.data_set_id==DataSet.id)\
            .join(Survey, Survey.project_id==Project.id)
    surveys = db.session.execute(surveys_query)
    result_obj = {}
    values_list = []
    outliers = []
    list_of_dict_survey_values = [dict(survey)[f"surveys_{surveyField}"] for survey in surveys]
    for value in list_of_dict_survey_values:
        values_list.append(int(value))
        if int(value) in result_obj:
            result_obj[int(value)] += 1
        else:
            result_obj[int(value)] = 1
    q1, q3= np.percentile(values_list,[25,75])
    iqr = q3 - q1
    lower_bound = q1 -(1.5 * iqr) 
    upper_bound = q3 +(1.5 * iqr) 
    for value in list_of_dict_survey_values:
        if int(value) < lower_bound and int(value) not in outliers:
            outliers.append(int(value))
        if int(value) > upper_bound and int(value) not in outliers:
            outliers.append(int(value))
    final_obj = {}
    final_obj["data_for_box_plot"] = {}
    final_obj["data_for_box_plot"]["value_count_pairs"] = result_obj
    final_obj["data_for_violin_plot"] = [{"value": key, "count": value} for key, value in result_obj.items()]
    final_obj["data_for_box_plot"]["min"] = min(values_list)
    final_obj["data_for_box_plot"]["max"] = max(values_list)
    final_obj["data_for_box_plot"]["median"] = np.median(values_list)
    final_obj["data_for_box_plot"]["lower_bound"] = lower_bound
    final_obj["data_for_box_plot"]["upper_bound"] = upper_bound
    final_obj["data_for_box_plot"]["first_quartile"] = q1
    final_obj["data_for_box_plot"]["third_quartile"] = q3
    final_obj["data_for_box_plot"]["outliers"] = outliers
    return jsonify(final_obj)
        
@data_set_routes.route('/<int:dataSetId>/projects/<int:projectId>/violinplot/<surveyField>/by-enumerator')
@login_required
def violin_plot_all_enumerators(dataSetId, projectId, surveyField):
    curr_user = current_user.to_dict()
    if curr_user["type_id"] == 1:
        surveys_query = db.session.query(DataSet.id,\
                getattr(Survey, surveyField),Survey.enumerator_id
                ).filter(DataSet.id==dataSetId, Project.id ==projectId)\
                .join(Project, Project.data_set_id==DataSet.id)\
                .join(Survey, Survey.project_id==Project.id)
    else:
        surveys_query = db.session.query(DataSet.id,\
                getattr(Survey, surveyField),Survey.enumerator_id
            # If the user isn't admin, query with current user id
            ).filter(DataSet.id==dataSetId, Project.user_id ==current_user.id, Project.id ==projectId)\
            .join(Project, Project.data_set_id==DataSet.id)\
            .join(Survey, Survey.project_id==Project.id)
    surveys = db.session.execute(surveys_query)
    
    surveys_list = [dict(survey) for survey in surveys]
    by_enum = {}
    for survey in surveys_list:
        enumerator = survey["surveys_enumerator_id"]
        if enumerator in by_enum:
            by_enum[enumerator]["values"].append(survey[f"surveys_{surveyField}"])
            by_enum[enumerator]["count"] += 1
        else:
            by_enum[enumerator] = {
                "values": [survey[f"surveys_{surveyField}"]],
                "count": 1
            }
    final_enum_list = list()
    for enumerator, obj in by_enum.items():
        enum_obj = {}
        result_obj = {}
        values_list = sorted(obj["values"])
        count = obj["count"]
        outliers = []
        for value in values_list:
            if int(value) in result_obj:
                result_obj[int(value)] += 1
            else:
                result_obj[int(value)] = 1
        q1, q3= np.percentile(values_list,[25,75])
        iqr = q3 - q1
        # This uses 1.5 standard deviations
        lower_bound = q1 -(1.5 * iqr) 
        upper_bound = q3 +(1.5 * iqr) 
        minVal = values_list[0]
        maxVal = values_list[-1]
        for value in values_list:
            if int(value) < lower_bound and int(value) not in outliers:
                outliers.append(int(value))
            if int(value) > upper_bound and int(value) not in outliers:
                outliers.append(int(value))
        enum_obj["enumerator"] = enumerator
        enum_obj["data_for_box_plot"] = {}
        enum_obj["data_for_box_plot"]["value_count_pairs"] = result_obj
        enum_obj["data_for_violin_plot"] = [{"value": key, "count": value} for key, value in result_obj.items()]
        enum_obj["data_for_box_plot"]["min"] = minVal
        enum_obj["data_for_box_plot"]["max"] = maxVal
        enum_obj["data_for_box_plot"]["median"] = np.median(values_list)
        enum_obj["data_for_box_plot"]["lower_bound"] = lower_bound
        enum_obj["data_for_box_plot"]["upper_bound"] = upper_bound
        enum_obj["data_for_box_plot"]["first_quartile"] = q1
        enum_obj["data_for_box_plot"]["third_quartile"] = q3
        enum_obj["data_for_box_plot"]["outliers"] = outliers
        final_enum_list.append(enum_obj)
    return jsonify(final_enum_list)
        

@data_set_routes.route('/<int:dataSetId>/violinplot/<int:surveyField>/by-enumerator')
@login_required
def violin_plot_by_enumerator(dataSetId, surveyField):
    curr_user = current_user.to_dict()
    surveys_query = db.session.query(DataSet.id,\
        Survey.project_id,Survey.enumerator_id, Survey.health_area_id, Survey.duration, Survey.date_time_administered, Survey.num_outlier_data_points, Survey.num_dont_know_responses\
            ).filter(DataSet.id==dataSetId, Project.user_id ==current_user.id)\
            .join(Project, Project.data_set_id==DataSet.id)\
            .join(Survey, Survey.project_id==Project.id)
    surveys = db.session.execute(surveys_query)
    result_dict = {}
    for survey in surveys:
        if dict(survey)["surveys_enumerator_id"] in result_dict:
            result_dict[dict(survey)["surveys_enumerator_id"]].append(dict(survey)[f"surveys_{surveyField}"])
        else:
            result_dict[dict(survey)["surveys_enumerator_id"]] = [dict(survey)[f"surveys_{surveyField}"]]
    # OLD WAY - SLOW:
    # surveys = db.session.query(DataSet).get(dataSetId).projects.filter_by(user_id=curr_user["id"]).first().surveys
    # for survey in surveys:
    #     print(survey)
    # data_set_for_graph = []
    # surveys_list = list(surveys)
    # for survey in surveys_list:
    #     data_set_for_graph.append(survey.to_dict())
    # return jsonify({dict(row)["surveys_enumerator_id"]: [dict(row)[f"surveys_{surveyField}"] for row in surveys]})
    return jsonify(result_dict)

@data_set_routes.route("/projects/<int:projectId>/health-areas/<int:healthAreaId>/map")
@login_required
def map_surveys(projectId, healthAreaId):
    health_area = db.session.query(HealthArea).options(joinedload("ha_surveys")).get(healthAreaId)
    surveys = health_area.to_dict_full_for_project(projectId)['surveys']
    meaningful_fields = ["date_time_administered", "duration", "num_dont_know_responses", "num_outlier_data_points", "enumerator_id", "respondent"]
    map_data = {
            "type": "FeatureCollection",
            "count_surveys": len(surveys),
            "features":  
            [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                survey["latitude"],
                                survey["longtitude"]
                            ]
                        },
                        "properties": {field: survey[field] for field in survey if field in meaningful_fields}
                    }
            for survey in surveys]
        }
    return jsonify(map_data)


@data_set_routes.route("/projects/<int:projectId>/health-areas/<int:healthAreaId>/center")
@login_required
def map_survey_center(projectId, healthAreaId):
    health_area = db.session.query(HealthArea).options(joinedload("ha_surveys")).get(healthAreaId)
    surveys = health_area.to_dict_full()['surveys']
    lat = {"sum": 0, "count": 0}
    long = {"sum": 0, "count": 0}
    largest_lat = float("-inf")
    largest_long = float("-inf")
    for survey in surveys:
        if abs(survey["latitude"]) > largest_lat:
            largest_lat = abs(survey["latitude"])
        if abs(survey["longtitude"]) > largest_long:
            largest_long = abs(survey["longtitude"])
        lat["sum"] += survey["latitude"]
        lat["count"] += 1
        long["sum"] += survey["longtitude"]
        long["count"] += 1
    lat_avg = lat["sum"]/lat["count"]
    long_avg = long["sum"]/long["count"]
    largest_lat_diff = abs(abs(lat_avg) - largest_lat)
    largest_long_diff = abs(abs(long_avg) - largest_long)
    return jsonify([ lat_avg, long_avg, largest_lat_diff, largest_long_diff])


@data_set_routes.route("/health-areas")
@login_required
def health_areas():
    health_areas = db.session.query(HealthArea)
    return jsonify(health_areas)


@data_set_routes.route("/<int:dataSetId>/projects/<int:projectId>/health-areas")
@login_required
def project_health_areas(projectId,dataSetId):
    health_area_ids = Survey.get_health_area_ids(projectId)
    health_areas = HealthArea.class_to_dict()
    ha_names = [{"name": health_areas[ha_id], "id": ha_id} for ha_id in health_area_ids]
    return jsonify(ha_names)

@data_set_routes.route("/survey-cto")
@login_required
def survey_cto_api():
    scto = pysurveycto.SurveyCTOObject('envelope', 'nickfmatthews@gmail.com', 'Envelope-VisX')
    raw = scto.get_form_data('NORC-IGA-Endline-Menage')
    final_file = pickle.dumps(raw)
    data_set = DataSet(
        data_set_name='NORC-IGA-Endline-Menage(API).csv',
        data_set=final_file
    )
    db.session.add(data_set)
    db.session.commit()
    return data_set.to_dict()
