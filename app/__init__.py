import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.data_set_routes import data_set_routes
from .api.project_routes import project_routes
from .api.survey_routes import survey_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)


app.config['SECRET_KEY'] = "s90m85SeV2DADov38J82"
app.secret_key = "s90m85SeV2DADov38J82"
app.config['WTF_CSRF_SECRET_KEY'] = "s90m85SeV2DADov38J82"
app.config['DATABASE_URL'] = "s90m85SeV2DADov38J82"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(data_set_routes, url_prefix='/api/data')
app.register_blueprint(project_routes, url_prefix='/api/projects')
app.register_blueprint(survey_routes, url_prefix='/api/surveys')
db.init_app(app)
Migrate(app, db)

CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=False
                        )
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
