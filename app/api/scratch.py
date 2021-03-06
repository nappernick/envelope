import csv
import os
import pandas as pd

def dta_to_pickle(dta):
    data = pd.io.stata.read_stata(dta)
    csv_file = data.to_csv()
    file_final = pickle.dumps(csv_file)
    return file_final

def zip_to_pickle(zip):
    zipfile_ob = zipfile.ZipFile(file_like_object)
    file_names = zipfile_ob.namelist()
    file_names = [file_name for file_name in file_names if not "__MACOSX/." in file_name]
    files = [zipfile_ob.open(name).read() for name in file_names]
    file_final = files[0]
    file_final = pickle.dumps(file_final)
    return file_final


# def data_processing_creating_survey_records_from_file(csvf):
#     print(csvf)
#     # csv_test = ("test.csv", csvf)
#     with open(csvf) as csvfile:
#         data_processing_creating_survey_records(csvfile)

# def data_processing_creating_survey_records(csvfile):
#     # original column headings: ["today_date", "start_tracking_time", "q9","q12", "q5latitude", "q5longitude", "duration_itw", "dk_total", "int_outlier_total"]
#     target_columns = ["date_time_administered","", "health_area","enumerator_id", "lat", "long", "duration", "num_outlier_data_points", "int_outlier_total", "row_index"]
#     target_indices = [4,5,11,14,2861,2862,2868,2899,2902, 0]
#     column_data = {}
#     for column in target_columns:
#         column_data[column] = []
#     reader = csv.reader(csvfile, delimiter=",")
#     for row in reader:
#         # print(row[0])
#         if row[0] == '':
#             continue

#         column_data[target_columns[0]].append(f'{row[target_indices[0]]} {row[target_indices[1]]}')
#         column_data[target_columns[2]].append(row[target_indices[2]])
#         column_data[target_columns[3]].append(row[target_indices[3]])
#         column_data[target_columns[4]].append(row[target_indices[4]])
#         column_data[target_columns[5]].append(row[target_indices[5]])
#         column_data[target_columns[6]].append(row[target_indices[6]])
#         column_data[target_columns[7]].append(row[target_indices[7]])
#         column_data[target_columns[8]].append(row[target_indices[8]])
#         column_data[target_columns[9]].append(row[target_indices[9]])
#     # print(column_data["row_index"])
#     return column_data 

def data_processing_for_survey_records_from_file(csvf):
    # csv_test = ("test.csv", csvf)
    with open(csvf, newline="", mode='r') as csvfile:
        reader = csv.reader(csv_file, delimiter=",")
        for row in reader:
            print("______ IN A ROW",row)
            break
        return data_processing_for_survey_records(csvfile)

def data_processing_for_survey_records(csv_file):
    if "\n" in csv_file:
        print("______if HERE")
        file_it = csv_file.split("\n")
        reader = csv.reader(file_it, delimiter=",")
    else: 
        print("______ELSE HERE")
        reader = csv.reader(csv_file, delimiter=",")
        for row in reader:
            print("______ IN A ROW",row)
            break
    # print(csv_file)
    # print(file_it)
    # original column headings: ["today_date", "start_tracking_time", "q9","q12", "q5latitude", "q5longitude", "duration_itw", "dk_total", "int_outlier_total"]
    # target_columns = ["date_time_administered","", "health_area","enumerator_id", "lat", "long", "duration", "num_outlier_data_points", "int_outlier_total", "row_index"]
    # target_indices = [4,5,11,14,2861,2862,2868,2899,2902, 0]
    # column_data = {}
    # health_areas = []
    print(reader)
    for row in reader:
        print("_________ ROW",row)
        if len(row) == 0:
            continue
        if row[0] == '':
            continue
        if row[11] not in health_areas:
            health_areas.append(row[11])
        column_data[row[0]] = {
            "date_time_administered": f'{row[target_indices[0]]} {row[target_indices[1]]}',
            "health_area": health_areas.index(row[target_indices[2]])+1, # index value of row[target_indices[2]] in health_areas
            "enumerator_id": row[target_indices[3]],
            "lat": row[target_indices[4]],
            "long": row[target_indices[5]],
            "duration": row[target_indices[6]],
            "num_dont_know_responses": row[target_indices[7]],
            "num_outlier_data_points": row[target_indices[8]]
        }
    print(column_data)
    return column_data

def data_processing_for_health_areas(csvf):
    with open(csvf) as csvfile:
        health_areas = []
        reader = csv.reader(csvfile, delimiter=",")
        for row in reader:
            if row[0] == '':
                continue
            if row[11] not in health_areas:
                health_areas.append(row[11])
        print(health_areas)
        return health_areas


# data_processing_for_survey_records("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv")
# data_processing("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash_gps.csv")
# data_processing_for_health_areas("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv")

