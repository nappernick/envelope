import csv

def data_processing(csvPath):
    with open(csvPath) as csvfile:
        target_columns = ["today_date", "q12", "duration_itw", "q5latitude", "q5longitude", "q9", "duration_itw", "dk_total", "int_outlier_total","check_dist"]
        reader = csv.reader(csvfile, delimiter=",")
        row1 = next(reader)
        for index, column in enumerate(row1):
            if column in target_columns:
                print(column, index)

data_processing("/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/my_stata_file.csv")

