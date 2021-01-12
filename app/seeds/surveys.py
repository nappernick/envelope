from app.models import db, Survey
from app.api.data_processing import data_processing_for_survey_records
from faker import Faker

fake = Faker()

def seed_surveys():
    surveys = data_processing_for_survey_records("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv")
    # print(surveys)
    # count = 0
    for survey in surveys.values():
        survey_seed = Survey(
            health_area_id=int(survey["health_area"]),
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
