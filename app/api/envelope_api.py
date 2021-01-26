import pysurveycto
import requests
import json
import pandas as pd

# Get data from SurveyCTO API
scto = pysurveycto.SurveyCTOObject('envelope', 'nickfmatthews@gmail.com', 'Envelope-VisX')
raw = scto.get_form_data('NORC-IGA-Endline-Menage')

# Change Directory
import os
os.chdir(r"/Users/nicholasmatthews/Library/Mobile Documents/com~apple~CloudDocs/app_academy/capstone/envelope/app/api")
cwd = os.getcwd()

# Write raw text to CSV file
text_file = open("csv.txt", "w")
csv = text_file.write(raw)
text_file.close()

# Import CSV file
df = pd.read_csv('csv.txt', header = 0, encoding='latin-1')
