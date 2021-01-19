from app.models import db, DataSet
import csv
import pickle

def seed_data_sets():
    # df = pd.read_csv('/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash.csv', sep=',')
    # # np.asarray(df.values).tofile('data_binary.dat')
    # df['a23_decimal'] = df['a23'].astype(str).map(decimal.Decimal)
    # bf = df.to_parquet("test.parquet", index=False)

    with open('/var/www/app/seeds/seed_survey.csv') as csvfile:
        reader = csv.reader(csvfile)
        parsed_file = []
        for row in reader:
            parsed_file.append(row)
        pickledfile = pickle.dumps(parsed_file)
        # print(pickledfile)
    


    data_set1 = DataSet(
        data_set_name="DRC Annual Survey.csv",
        data_set=pickledfile,
    )
    db.session.add(data_set1)
    data_set2 = DataSet(
        data_set_name="RMAC Sub-Saharan Water Access.dta",
        data_set=pickledfile,
    )
    db.session.add(data_set2)
    data_set3 = DataSet(
        data_set_name="DWB Overview Data.csv.zip",
        data_set=pickledfile,
    )
    db.session.add(data_set3)
    data_set4 = DataSet(
        data_set_name="WHO  SSA W18-24 Lit.csv",
        data_set=pickledfile,
    )
    db.session.add(data_set4)

    db.session.commit()
# seed_data_sets()

def undo_data_sets():
    db.session.execute('TRUNCATE TABLE data_sets RESTART IDENTITY CASCADE;')
    db.session.commit()
