import pandas
data = pandas.io.stata.read_stata('NORC-IGA-Endline-Menage_cleaned.dta')
data.to_csv('my_stata_file.csv')
