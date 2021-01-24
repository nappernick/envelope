from app.models import db, Project

def seed_projects():
    project1 = Project(
        project_name="NORC Clean Water",
        project_notes="",
        data_set_id=1,
        user_id=2,
        target_health_area_count=172,
        taget_surv_count=24,
    )

    db.session.add(project1)
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE TABLE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
