from .db import db

class HealthArea(db.Model): 
    __tablename__ = "health_areas"
    id = db.Column(db.Integer, primary_key = True)
    health_area = db.Column(db.String(100), nullable = False, unique = True)

    ha_surveys = db.relationship("Survey", backref="health_area")

    def to_dict(self):
        return {
            "id": self.id,
            "health_area": self.health_area
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "health_area": self.health_area,
            "surveys": [survey.to_dict() for survey in self.ha_surveys]
        }

    @classmethod
    def class_to_dict(cls):
        ha_dict = {}
        health_areas = db.session.query(HealthArea)
        for ha in health_areas:
            had = ha.to_dict()
            ha_dict[had["id"]] = had["health_area"]
        return ha_dict
