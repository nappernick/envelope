from .db import db
from sqlalchemy.orm import load_only

class Survey(db.Model): 
    __tablename__ = "surveys"
    id = db.Column(db.Integer, primary_key = True)
    health_area_id = db.Column(db.Integer, db.ForeignKey("health_areas.id"), nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)
    enumerator_id = db.Column(db.String(20), nullable = False)
    date_time_administered = db.Column(db.DateTime, nullable = False)
    duration = db.Column(db.Float, nullable = False)
    respondent = db.Column(db.String(100), nullable = False)
    num_outlier_data_points = db.Column(db.Integer, nullable = True)
    num_dont_know_responses = db.Column(db.Integer, nullable = True)
    outside_health_zone = db.Column(db.Boolean())
    lat = db.Column(db.Float, nullable = False)
    long = db.Column(db.Float, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    project = db.relationship("Project", backref="survey")
    survey_questions = db.relationship("SurveyQuestion")
    survey_health_area = db.relationship("HealthArea")

    def to_dict(self):
        return {
            "id": self.id,
            "health_area_id": self.health_area_id,
            "project_id": self.project_id,
            "enumerator_id": self.enumerator_id,
            "date_time_administered": self.date_time_administered,
            "duration": self.duration,
            "respondent": self.respondent,
            "num_outlier_data_points": self.num_outlier_data_points,
            "num_dont_know_responses": self.num_dont_know_responses,
            "outside_health_zone": self.outside_health_zone,
            "latitude": self.lat,
            "longtitude": self.long,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "health_area_id": self.health_area_id,
            "project_id": self.project_id,
            "enumerator_id": self.enumerator_id,
            "date_time_administered": self.date_time_administered,
            "duration": self.duration,
            "respondent": self.respondent,
            "num_outlier_data_points": self.num_outlier_data_points,
            "num_dont_know_responses": self.num_dont_know_responses,
            "outside_health_zone": self.outside_health_zone,
            "latitude": self.lat,
            "longtitude": self.long,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "health_area": self.survey_health_area
        }

    # def to_dict_ha(self): 
    #     return {
    #         "health_area_id": 
    #     }

    @classmethod
    def get_health_area_ids(cls, projectId):
        project_health_areas = db.session.query(Survey).filter_by(project_id = projectId).options(load_only(cls.health_area_id)).distinct(cls.health_area_id).all()
        return [health_area.health_area_id for health_area in project_health_areas]
