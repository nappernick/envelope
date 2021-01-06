import csv

def data_processing(csvPath):
    with open(csvPath) as csvfile:
        reader = csv.reader(csvfile, delimiter=",")
        for row in spamreader:
            print("\n".join(row))
