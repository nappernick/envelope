import pandas
data = pandas.io.stata.read_stata('menage_dash_gps.dta')
data.to_csv('menage_dash_gps.csv')
