import pandas as pd
import tempfile
import pysurveycto

# Get SurveyCTO data
scto = pysurveycto.SurveyCTOObject('envelope', 'nickfmatthews@gmail.com', 'Envelope-VisX')
raw = scto.get_form_data('NORC-IGA-Endline-Menage')

# Turn raw data into dataframe
tp = tempfile.NamedTemporaryFile()
tp.write(raw.encode("utf-8"))
with open(tp.name, newline="\n", mode='r') as f:
    df = pd.read_csv(f, header = 0, encoding='latin-1')

# print will only show a small part of the dataframe, but proves it works
print(df)

# Close the temporary file, which deletes it - new dataframe persists
tp.close()


# Alternatively, if you don't need to use a dataframe, this approach will give you 
# something very easy to work with - a list of lists where each list in the list is a row:
# [ ["SubmissionDate", "start", "end", "deviceid", ...], ["Jan 26, 2021 2:43:48 AM","Jan 26, 2021 2:40:55 AM","Jan 26, 2021 2:43:48 AM","(web)",...] ]
file_it = raw.split("\n")
reader = csv.reader(file_it, delimiter=",")
print([row for row in reader])
