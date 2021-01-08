from app.models import db, HealthArea
from app.api.data_processing import data_processing_for_health_areas

def seed_health_areas():
    health_areas = data_processing_for_health_areas("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv")

    for health_area1 in health_areas:
        health_area_seed = HealthArea(
            health_area=health_area1
        )
        db.session.add(health_area_seed)
    db.session.commit()


def undo_health_areas():
    db.session.execute('TRUNCATE TABLE health_areas RESTART IDENTITY CASCADE;')
    db.session.commit()
