from .db import db

class Project(db.Model): 
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String(100), nullable = False, unique = True)
    project_notes = db.Column(db.Text, nullable = True)
    data_set_id = db.Column(db.Integer, db.ForeignKey("data_sets.id"), nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    target_health_area_count = db.Column(db.Integer, nullable = False)
    target_surv_count = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", backref="project", lazy="select")
    surveys = db.relationship("Survey", cascade="all,delete")
    data_set = db.relationship("DataSet")

    def to_dict(self):
        return {
            "id": self.id,
            "project_name": self.project_name,
            "project_notes": self.project_notes,
            "data_set_id": self.data_set_id,
            "user_id": self.user_id,
            "target_health_area_count": self.target_health_area_count,
            "target_surv_count": self.target_surv_count,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "project_name": self.project_name,
            "project_notes": self.project_notes,
            "data_set_id": self.data_set_id,
            "user_id": self.user_id,
            "target_health_area_count": self.target_health_area_count,
            "target_surv_count": self.target_surv_count,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "surveys": [survey.to_dict() for survey in self.surveys]
        }

    def search(self):
        return {
            "value": self.id,
            "label": self.project_name
        }

    def to_dict_survey_summary(self):
        surveys = [survey.to_dict() for survey in self.surveys]
        enumerators = []
        health_areas = []
        health_area_count = 0
        enumerator_count = 0
        dont_know_count = 0
        outlier_count = 0
        sum_duration = float()
        for survey in surveys:
            if survey["enumerator_id"] not in enumerators:
                enumerator_count += 1
                enumerators.append(survey["enumerator_id"])
            if survey["health_area_id"] not in health_areas:
                health_area_count += 1
                health_areas.append(survey["health_area_id"])
            dont_know_count += survey["num_dont_know_responses"]
            outlier_count += survey["num_outlier_data_points"]
            sum_duration += survey["duration"]
        avg_duration = float(sum_duration / len(surveys)) if len(surveys) else 0.00
        return {
            
            "id": self.id,
            "project_name": self.project_name,
            "project_notes": self.project_notes,
            "data_set_id": self.data_set_id,
            "user_id": self.user_id,
            "target_health_area_count": self.target_health_area_count,
            "target_surv_count": self.target_surv_count,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "data_set": self.data_set.to_dict(),
            "survey_count": len(surveys), 
            "health_area_count": health_area_count,
            "enumerator_count": enumerator_count,
            "dont_know_count": dont_know_count,
            "outlier_count": outlier_count,
            "avg_duration": avg_duration
        }
