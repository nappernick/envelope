from app.models import db, Type

def seed_types():
    admin = Type(type="admin")
    client = Type(type="client")
    lb = Type(type="low_bandwidth")

    db.session.add(admin)
    db.session.add(client)
    db.session.add(lb)

    db.session.commit()

def undo_types():
    db.session.execute('TRUNCATE TABLE types RESTART IDENTITY CASCADE;')
    db.session.commit()
