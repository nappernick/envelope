from app.models import db, Project

def seed_projects():
    project1 = Project(
        project_name="NORC Clean Water",
        project_notes="",
        data_set_id=1,
        user_id=2,
        target_health_area_count=172,
        target_surv_count=24,
        survey_count=1884,
        avg_duration=48.75372434536446,
        health_area_count=78,
        enumerator_count=25,
        dont_know_count=17990,
        outlier_count=308
    )

    db.session.add(project1)
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE TABLE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
