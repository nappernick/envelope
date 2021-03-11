import pandas as pd
import csv
import tempfile
import pysurveycto

# # SAM ORIGINAL
# # Get data from SurveyCTO API
scto = pysurveycto.SurveyCTOObject('envelope', 'nickfmatthews@gmail.com', 'Envelope-VisX')
raw = scto.get_form_data('NORC-IGA-Endline-Menage')

# # Change Directory
# import os
# os.chdir(r"C:\Users\Samuel\PycharmProjects\pysurveycto_example")
# cwd = os.getcwd()

# # Write raw text to CSV file
# text_file = open("csv.txt", "w")
# csv = text_file.write(raw)
# text_file.close()

# # NICK STUFF
# # Import CSV file
# df = pd.read_csv('csv.txt', header = 0, encoding='latin-1')

# # Get SurveyCTO data
# scto = pysurveycto.SurveyCTOObject('envelope', 'nickfmatthews@gmail.com', 'Envelope-VisX')
# raw = scto.get_form_data('NORC-IGA-Endline-Menage')

# # Turn raw data into dataframe
# tp = tempfile.NamedTemporaryFile()
# tp.write(raw.encode("utf-8"))
# with open(tp.name, newline="\n", mode='r') as f:
#     df = pd.read_csv(f, header = 0, encoding='latin-1')

# # print will only show a small part of the dataframe, but proves it works
# # print(df.head)
# for thing in df.iterrows():
#     print(thing)


# # Close the temporary file, which deletes it - new dataframe persists
# tp.close()

# # Alternatively, if you don't need to use a dataframe, this approach will give you 
# # something very easy to work with - a list of lists where each list in the list is a row:
# # [ ["SubmissionDate", "start", "end", "deviceid", ...], ["Jan 26, 2021 2:43:48 AM","Jan 26, 2021 2:40:55 AM","Jan 26, 2021 2:43:48 AM","(web)",...] ]
file_it = raw.split("\n")
reader = csv.reader(file_it, delimiter=",")
print([row for row in reader])



# # TESTING
# # API is very slow & I'm testing, so using the local file:
# df = pd.read_csv('/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/csv.txt', header = 0, encoding='latin-1')
# # for thing in df.iterrows():
# #     print(thing)

# headers = df.columns.values
# for index, header in enumerate(headers):
#     print(index)
#     print(header)


with open('/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api/csv.txt') as f:
    reader = csv.reader(f, delimiter=",")
    ls = []
    for index, row in reader:
        ls.append(index)
        print(ls)
