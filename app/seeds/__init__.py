from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_types, undo_types
from .data_sets import seed_data_sets, undo_data_sets
from .projects import seed_projects, undo_projects
from .health_areas import seed_health_areas, undo_health_areas
from .surveys import seed_surveys, undo_surveys

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_types()
    seed_users()
    seed_data_sets()
    seed_projects()
    seed_health_areas()
    seed_surveys()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_types()
    undo_users()
    undo_data_sets()
    undo_projects()
    undo_health_areas()
    undo_surveys()
    # Add other undo functions here
