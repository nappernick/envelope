from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Project


def project_name_unique(form, field):
    print("Checking if project name already exists", field.data)
    name = field.data
    project = db.session.query(Project).filter(Project.project_name == name).first()
    if project:
        raise ValidationError("Project name already exists.")

class ProjectForm(FlaskForm):
    project_name = StringField("project_name", validators=[DataRequired(), project_name_unique])
    data_set_id = IntegerField("data_set_id", validators=[DataRequired()])
    data_set_id = IntegerField("data_set_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    target_health_area_count = IntegerField("target_health_area_count", validators=[DataRequired()])
    target_surv_count = IntegerField("target_surv_count", validators=[DataRequired()])
