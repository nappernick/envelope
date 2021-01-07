from .db import db

class Survey(db.Model): 
    __tablename__ = "surveys"
    id = db.Column(db.Integer, primary_key = True)
    health_area = db.Column(db.String(100), nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)
    enumerator_id = db.Column(db.String(20), nullable = False)
    date_time_administered = db.Column(db.DateTime, nullable = False)
    duration = db.Column(db.Float, nullable = False)
    respondent = db.Column(db.String(100), nullable = False)
    num_outlier_data_points = db.Column(db.Integer, nullable = False)
    num_dont_know_responses = db.Column(db.Integer, nullable = False)
    outside_health_zone = db.Column(db.Boolean())
    lat = db.Column(db.Float, nullable = False)
    long = db.Column(db.Float, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    project = db.relationship("Project", backref="survey")
    survey_questions = db.relationship("SurveyQuestion")

    def to_dict(self):
        return {
            "id": self.id,
            "health_area": self.health_area,
            "project_id": self.project_id,
            "enumerator_id": self.enumerator_id,
            "date_time_administered": self.date_time_administered,
            "duration": self.duration,
            "respondent": self.respondent,
            "num_outlier_data_points": self.num_outlier_data_points,
            "num_dont_know_responses": self.num_dont_know_responses,
            "outside_health_zone": self.outside_health_zone,
            "lat": self.lat,
            "long": self.long,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
