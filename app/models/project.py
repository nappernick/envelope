from .db import db

class Project(db.Model): 
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String(100), nullable = False, unique = True)
    project_notes = db.Column(db.Text, nullable = True)
    data_set_id = db.Column(db.Integer, db.ForeignKey("data_sets.id"), nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", backref="project", lazy="select")
    surveys = db.relationship("Survey")

    def to_dict(self):
        return {
            "id": self.id,
            "project_name": self.project_name,
            "project_notes": self.project_notes,
            "data_set_id": self.data_set_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
