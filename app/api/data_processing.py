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
        health_areas = ['Bisisi Aire de Sante', 'Bumoga Aire de Sante', 'Chaminunu Aire de Sante', 'Chega Aire de Sante', 'Chibinda Aire de Sante', 'Chigiri Aire de Sante', 'Cholobera Aire de Sante', 'Fendula Aire de Sante', 'Kachuba Aire de Sante', 'Kakunda Aire de Sante', 'Kashesha Aire de Sante', 'Mukaba Aire de Sante', 'Mule Aire de Sante', 'Ntulu Aire de Sante', 'Rambo Aire de Sante', 'Rwamikundu Aire de Sante', 'Budoodo Aire de Sante', 'Cagala Aire de Sante', 'Culwe Aire de Sante', 'Izege Aire de Sante', 'Luhago Aire de Sante', 'Luntukulu Aire de Sante', 'Mudirhi Aire de Sante', 'Murhali Aire de Sante', 'Mwirama Aire de Sante', 'Nyamarhege Aire de Sante', 'Karhala Aire de Sante', 'Kimalanjala Aire de Sante', 'Luciga Aire de Sante', 'Lurhala Aire de Sante', 'Mugamba Aire de Sante', 'Ntondo Aire de Sante', 'Bisembe Aire de Sante', 'Buziba Aire de Sante', 'Iganda Aire de Sante', 'Kasika Aire de Sante', 'Kibanda Aire de Sante', 'Kitagana Aire de Sante', 'Kitamba Aire de Sante', 'Mbobole Aire de Sante', 'Mulombozi Aire de Sante', 'Ngando Aire de Sante', 'Sungwe Aire de Sante', 'Adra 31 Aire de Sante', 'Kafubu Aire de Sante', 'Kalunda Aire de Sante', 'Kinama Aire de Sante', 'Kitanda Aire de Sante', 'Kiwele Aire de Sante', 'Mulyashi Aire de Sante', 'Sambwa Aire de Sante', 'Kyenge Aire de Sante', 'Lubuko Aire de Sante', 'Lutandula Lwalala Aire de Sante', 'Malambwe Aire de Sante', 'Minga Aire de Sante', 'Mwemena Aire de Sante', 'Nkonko Aire de Sante', 'Kapulwa Aire de Sante', 'Katobio Aire de Sante', 'Kibangu Aire de Sante', 'Kyembe 1 Aire de Sante', 'Lupidi1 Aire de Sante', 'Mulandi Aire de Sante', 'Dilenge Aire de Sante', 'Kabanda Aire de Sante', 'Kanshimba Aire de Sante', 'Kisele Aire de Sante', 'Kwiyongo Aire de Sante', 'Lusinga Aire de Sante', 'Mubidi Aire de Sante', 'Muombe Aire de Sante', 'Mwema Aire de Sante', 'Nkonga Aire de Sante', 'Nsokelwa Aire de Sante', 'Ngambwa Aire de Sante', 'Bungalama Aire de Sante', 'Ngolole Aire de Sante']
        reader = csv.reader(csvfile, delimiter=",")
        for row in reader:
            if row[0] == '':
                continue
            column_data[row[0]] = {
                "date_time_administered": f'{row[target_indices[0]]} {row[target_indices[1]]}',
                "health_area": health_areas.index(row[target_indices[2]]), # index value of row[target_indices[2]] in health_areas
                "enumerator_id": row[target_indices[3]],
                "lat": row[target_indices[4]],
                "long": row[target_indices[5]],
                "duration": row[target_indices[6]],
                "num_dont_know_responses": row[target_indices[7]],
                "num_outlier_data_points": row[target_indices[8]]
            }
        print(column_data)
        return column_data


data_processing_for_graphs("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/seeds/seed_survey.csv")
# data_processing("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/menage_dash_gps.csv")
