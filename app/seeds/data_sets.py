from app.models import db, DataSet
import csv
import pickle

def seed_data_sets():
    with open('/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv') as csvfile:
    # with open('/var/www/app/seeds/seed_survey.csv') as csvfile:
        reader = csv.reader(csvfile)
        parsed_file = []
        for row in reader:
            parsed_file.append(row)
        pickledfile = pickle.dumps(parsed_file)
    
    data_set1 = DataSet(
        data_set_name="DRC Annual Survey.csv",
        data_set=pickledfile,
    )
    db.session.add(data_set1)
    data_set2 = DataSet(
        data_set_name="RMAC Water Access.dta",
        data_set=pickledfile,
    )
    db.session.add(data_set2)
    data_set3 = DataSet(
        data_set_name="WHO SSA W18-24 Lit.csv.zip",
        data_set=pickledfile,
    )
    db.session.add(data_set3)

    db.session.commit()
# seed_data_sets()

def undo_data_sets():
    db.session.execute('TRUNCATE TABLE data_sets RESTART IDENTITY CASCADE;')
    db.session.commit()
