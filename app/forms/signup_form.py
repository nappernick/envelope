from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = PasswordField('password', validators=[DataRequired()])
    type_id = IntegerField('type_id', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
