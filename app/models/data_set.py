from .db import db

class DataSet(db.Model): 
    __tablename__ = "data_sets"
    id = db.Column(db.Integer, primary_key = True)
    data_set_name = db.Column(db.String(100), nullable = False, unique = True, index=True)
    data_set = db.Column(db.LargeBinary, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now(), index=True)
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now(), index=True)

    projects = db.relationship("Project", backref="data-set", lazy='dynamic', cascade="all,delete")



    def to_dict(self):
        return {
            "id": self.id,
            "data_set_name": self.data_set_name,
            # "data_set": self.data_set,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    def to_dict_partial_full(self):
        return {
            "id": self.id,
            "data_set_name": self.data_set_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "projects": [project.to_dict() for project in self.projects]
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "data_set_name": self.data_set_name,
            "data_set": self.data_set,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "projects": [project.to_dict() for project in self.projects]
        }
