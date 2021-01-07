import csv

def data_processing_creating_survey_records(csvf):
    dict = {}
    with open(csvf) as csvfile:
        # original column headings: ["today_date", "start_tracking_time", "q9","q12", "q5latitude", "q5longitude", "duration_itw", "dk_total", "int_outlier_total"]
        target_columns = ["date_time_administered","", "health_area","enumerator_id", "lat", "long", "duration", "num_outlier_data_points", "int_outlier_total", "row_index"]
        target_indices = [4,5,11,14,2861,2862,2868,2899,2902, 0]
        column_data = {}
        for column in target_columns:
            column_data[column] = []
        reader = csv.reader(csvfile, delimiter=",")
        for row in reader:
            # print(row[0])
            if row[0] == '':
                continue

            column_data[target_columns[0]].append(f'{row[target_indices[0]]} {row[target_indices[1]]}')
            column_data[target_columns[2]].append(row[target_indices[2]])
            column_data[target_columns[3]].append(row[target_indices[3]])
            column_data[target_columns[4]].append(row[target_indices[4]])
            column_data[target_columns[5]].append(row[target_indices[5]])
            column_data[target_columns[6]].append(row[target_indices[6]])
            column_data[target_columns[7]].append(row[target_indices[7]])
            column_data[target_columns[8]].append(row[target_indices[8]])
            column_data[target_columns[9]].append(row[target_indices[9]])
        # print(column_data["row_index"])
        return column_data

def data_processing_for_graphs(csvf):
    dict = {}
    with open(csvf) as csvfile:
        # original column headings: ["today_date", "start_tracking_time", "q9","q12", "q5latitude", "q5longitude", "duration_itw", "dk_total", "int_outlier_total"]
        target_columns = ["date_time_administered","", "health_area","enumerator_id", "lat", "long", "duration", "num_outlier_data_points", "int_outlier_total", "row_index"]
        target_indices = [4,5,11,14,2861,2862,2868,2899,2902, 0]
        column_data = {}
        reader = csv.reader(csvfile, delimiter=",")
        for row in reader:
            if row[0] == '':
                continue
            column_data[row[0]] = {
                "date_time_administered": f'{row[target_indices[0]]} {row[target_indices[1]]}',
                "health_area": row[target_indices[2]],
                "enumerator_id": row[target_indices[3]],
                "lat": row[target_indices[4]],
                "long": row[target_indices[5]],
                "duration": row[target_indices[6]],
                "num_dont_know_responses": row[target_indices[7]],
                "num_outlier_data_points": row[target_indices[8]]
            }
        print(column_data["1"])
        return column_data


# data_processing_for_surveys("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash.csv")
# data_processing("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash_gps.csv")
