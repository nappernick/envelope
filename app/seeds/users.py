from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='demo', email='demo@aa.io',
                password='password', first_name='Demo', last_name='User', type_id=1)
    db.session.add(demo)
    demo1 = User(username='billyblanks', email='billyblanks@taibo.com',
                password='password', first_name='William', last_name='Blanks', type_id=2)
    db.session.add(demo1)
    demo2 = User(username='pattycakes', email='pcakes@bakerswoman.com',
                password='password', first_name='Patricia', last_name='Cakes', type_id=2)
    db.session.add(demo2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE TABLE users RESTART IDENTITY CASCADE;')
    db.session.commit()
