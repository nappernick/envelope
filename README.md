# envelope - non-profit dashboard & reporting
## MVP
- Port over stata statistical engine to python code
- Perform same visualizations & data cleaning that is currently done with stata
- Integrate with the SurveyCEO api to pull reports, providing data to python statistics engine
- Admin user that can provision a client user with specific reporting & visualizations
- Client user can log in and see their specific reports in a very attractive dashboard

## Extended Feature Ideas
- Mapping of each area cluster visited by a reports set of field surveyors (possibly showing the route traveled & where/when reports were taken, with different surveys shown with different colors - need to check Google Maps API for applicability)
- Detailed reporting on problem surveys & surveyors - automatically generate two reports for each survey, one detailing the list of problem surveyors, where they pass a specific threshold for a number of surveys that fall outside 2 standard deviations fromt he mean, and a report detailing the issue surveys, where you can see the report and specific values that fall 2 standard deviations outside the mean
- Detailed viewing of individual surveys, with a question by question view, highlighting those responses that were 1 standard deviation from the mean, with the ability to create notes on survey questions/responses so a QA specialist could reach out to the specific surveyor & 
- Two types of users, an admin user that can provision accounts for clients/view all reports/assign reports to specific clients, and a client user, who can view their specific reports, with maps data, box plots, bar graphs
- Ability to provide a dataset to the reporting engine, and choose the graphical visualizations that the user wants to see given that data set


## Technologies
- Python
- React
- Flask
- Postgre
- SQLAlchmey
- ChartJS (https://github.com/datavisyn/chartjs-chart-box-and-violin-plot or https://github.com/sgratzl/chartjs-chart-boxplot)
- React Modals
- 
