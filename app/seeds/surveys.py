from app.models import db, Survey
from app.api.data_processing import data_processing_for_graphs
import csv
from faker import Faker

fake = Faker()

def data_processing_for_graphs(csvf):
    dict = {}
    with open(csvf) as csvfile:
        # original column headings: ["today_date", "start_tracking_time", "q9","q12", "q5latitude", "q5longitude", "duration_itw", "dk_total", "int_outlier_total"]
        target_columns = ["date_time_administered","", "health_area","enumerator_id", "lat", "long", "duration", "num_outlier_data_points", "int_outlier_total", "row_index"]
        target_indices = [4,5,11,14,2861,2862,2868,2899,2902, 0]
        column_data = {}
        reader = csv.reader(csvfile, delimiter=",")
        for row in reader:
            if row[0] == '':
                continue
            column_data[row[0]] = {
                "date_time_administered": f'{row[target_indices[0]]} {row[target_indices[1]]}',
                "health_area": row[target_indices[2]],
                "enumerator_id": row[target_indices[3]],
                "lat": row[target_indices[4]],
                "long": row[target_indices[5]],
                "duration": row[target_indices[6]],
                "num_dont_know_responses": row[target_indices[7]],
                "num_outlier_data_points": row[target_indices[8]]
            }
        print(column_data["1"])
        return column_data


def seed_surveys():
    surveys = data_processing_for_graphs("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash.csv")
    # print(surveys)
    # count = 0
    for survey in surveys.values():
        survey_seed = Survey(
            health_area=survey["health_area"],
            project_id=1,
            enumerator_id=survey["enumerator_id"],
            date_time_administered=survey["date_time_administered"],
            duration=survey["duration"],
            respondent=fake.name(),
            num_outlier_data_points=int(float(str(survey["num_outlier_data_points"]))),
            num_dont_know_responses=int(float(str(survey["num_dont_know_responses"]))),
            lat=survey["lat"],
            long=survey["long"],
            outside_health_zone=False
        ) 
        db.session.add(survey_seed)
    db.session.commit()
    

def undo_surveys():
    db.session.execute('TRUNCATE TABLE surveys RESTART IDENTITY CASCADE;')
    db.session.commit()
