import os
import zipfile
import pickle
import pandas as pd
import numpy as np 
from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, DataSet, HealthArea, Survey, Project
from .auth_routes import authenticate
# from .data_processing import data_processing

data_set_routes = Blueprint('data', __name__)

@data_set_routes.route('/data-sets')
@login_required
def data():
    curr_user = current_user.to_dict()
    if curr_user["type_id"] == 1: 
        print("_____HERE")
        data = db.session.query(DataSet).all()
        return jsonify([data_set.to_dict() for data_set in data])
    else:
        return {'errors': ['Unauthorized']}, 401

@data_set_routes.route("/upload", methods=['POST'])
@login_required
def data_file_upload():
    file = request.files['myFile']
    file_name = file.filename
    print(file_name)
    file_name_list = file.filename.split(".")
    file_like_object = file.stream._file
    if file_name_list[len(file_name_list)-1] == "dta":
        print("__________AT DTA")
        data = pd.io.stata.read_stata(file)
        csv_file = data.to_csv()
        csv_file = csv_file.decode("utf-8")
        file_final = pickle.dumps(csv_file)

    elif file_name_list[len(file_name_list)-1] == "zip":
        print("_____AT ZIP")
        zipfile_ob = zipfile.ZipFile(file_like_object)
        file_names = zipfile_ob.namelist()
        file_names = [file_name for file_name in file_names if not "__MACOSX/." in file_name]
        files = [zipfile_ob.open(name).read() for name in file_names]
        file_final = files[0].decode("utf-8")
        file_final = pickle.dumps(file_final)

    elif file_name_list[len(file_name_list)-1] == "csv":
        print("_____AT CSV")
        csv_file=file.read()
        file_final = pickle.dumps(csv_file)
    else :
        return {"errors": "This file type is not accepted, please only upload .dta, .csv, or .csv.zip file types."}
    data_set = DataSet(
        data_set_name=file_name,
        data_set=file_final
    )
    db.session.add(data_set)
    db.session.commit()
    return jsonify("file")



@data_set_routes.route('/<dataSetId>/violinplot/<surveyField>')
@login_required
def violin_plot(dataSetId, surveyField):
    curr_user = current_user.to_dict()
    surveys_query = db.session.query(DataSet.id,\
        Survey.project_id,Survey.enumerator_id, Survey.health_area_id, Survey.duration, Survey.date_time_administered, Survey.num_outlier_data_points, Survey.num_dont_know_responses\
            ).filter(DataSet.id==dataSetId, Project.user_id ==current_user.id)\
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
        if int(value) < lower_bound:
            outliers.append(int(value))
        if int(value) > upper_bound:
            outliers.append(int(value))
    final_obj = {}
    final_obj["value_count_pairs"] = result_obj
    final_obj["data_for_box_plot"] = [{"value": key, "count": value} for key, value in result_obj.items()]
    # final_obj['values'] = values_list
    final_obj["min"] = min(values_list)
    final_obj["max"] = max(values_list)
    final_obj["median"] = np.median(values_list)
    final_obj["lower_bound"] = lower_bound
    final_obj["upper_bound"] = upper_bound
    final_obj["first_quartile"] = q1
    final_obj["third_quartile"] = q3
    final_obj["outliers"] = outliers
    # return jsonify([{"value": key, "count": value} for key, value in result_list.items()])
    return jsonify(final_obj)
        

@data_set_routes.route('/<dataSetId>/violinplot/<surveyField>/by-enumerator')
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
    health_area = db.session.query(HealthArea).get(healthAreaId)
    surveys = health_area.to_dict_full()['surveys']
    meaningful_fields = ["date_time_administered", "duration", "num_dont_know_responses", "num_outlier_data_points", "enumerator_id"]
    map_data = {
            "type": "FeatureCollection",
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
    print(map_data)
    return jsonify(map_data)


@data_set_routes.route("/projects/<int:projectId>/health-areas/<int:healthAreaId>/center")
@login_required
def map_survey_center(projectId, healthAreaId):
    health_area = db.session.query(HealthArea).get(healthAreaId)
    surveys = health_area.to_dict_full()['surveys']
    lat = {"sum": 0, "count": 0}
    long = {"sum": 0, "count": 0}
    for survey in surveys:
        lat["sum"] += survey["latitude"]
        lat["count"] += 1
        long["sum"] += survey["longtitude"]
        long["count"] += 1
    lat_avg = lat["sum"]/lat["count"]
    long_avg = long["sum"]/long["count"]
    return jsonify([ lat_avg, long_avg])


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
