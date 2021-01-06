from .db import db

class SurveyQuestion(db.Model): 
    __tablename__ = "survey_questions"
    id = db.Column(db.Integer, primary_key = True)
    survey_id = db.Column(db.Integer, db.ForeignKey("surveys.id"), nullable = False)
    question = db.Column(db.String(), nullable = False)
    value = db.Column(db.String(), nullable = False)
    outside_2_sd = db.Column(db.Boolean())
    standard_deviation = db.Column(db.Boolean())
    standard_deviation = db.Column(db.Integer())

    survey = db.relationship("Survey", backref="survey_question", lazy="select")


    def to_dict(self):
        return {
            "id": self.id,
            "survey_id": self.survey_id,
            "question": self.question,
            "value": self.value,
            "outside_2_sd": self.outside_2_sd,
            "plausible": self.respondent,
            "standard_deviation": self.standard_deviation
        }
