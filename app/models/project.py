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
    enumerator_count = db.Column(db.Integer, nullable=True)
    survey_count = db.Column(db.Integer, nullable=True)
    health_area_count = db.Column(db.Integer, nullable=True)
    avg_duration = db.Column(db.Float, nullable=True)
    dont_know_count = db.Column(db.Integer, nullable=True)
    outlier_count = db.Column(db.Integer, nullable=True)
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
            "survey_count": self.survey_count, 
            "health_area_count": self.health_area_count,
            "enumerator_count": self.enumerator_count,
            "dont_know_count": self.dont_know_count,
            "outlier_count": self.outlier_count,
            "avg_duration": self.avg_duration,
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
            "survey_count": self.survey_count, 
            "health_area_count": self.health_area_count,
            "enumerator_count": self.enumerator_count,
            "dont_know_count": self.dont_know_count,
            "outlier_count": self.outlier_count,
            "avg_duration": self.avg_duration,
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
        health_areas = []
        health_area_survey_count = {}
        health_area_count = 0
        for survey in surveys:
            if survey["health_area_id"] not in health_area_survey_count:
                health_area_survey_count[survey["health_area_id"]] = 1
            if survey["health_area_id"] in health_area_survey_count:
                health_area_survey_count[survey["health_area_id"]] += 1
            if survey["health_area_id"] not in health_areas:
                health_area_count += 1
                health_areas.append(survey["health_area_id"])
        surv_coverage_total = float()
        for survey_count in health_area_survey_count.values():
            surv_coverage_total += survey_count / self.target_surv_count
        survey_coverage = surv_coverage_total / health_area_count
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
            "survey_count": self.survey_count, 
            "health_area_count": self.health_area_count,
            "health_area_coverage": self.health_area_count / self.target_health_area_count,
            "survey_coverage": survey_coverage,
            "enumerator_count": self.enumerator_count,
            "dont_know_count": self.dont_know_count,
            "outlier_count": self.outlier_count,
            "avg_duration": self.avg_duration,
        }
