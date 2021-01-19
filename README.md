# Envelope - non-profit data processing, visualizations, and multi-location mapping

## V1
### Three types of users: 
 - Admin user with access to all data sets & reports (not direct data access, but the data necessary to render reports)
 - Client users with access to their specific data sets & reports
 - Low bandwidth (LB) users who need very limited data / functionality
### Admin Tools:
- All Projects View
    - On login users infinite scroll of all the active projects, displayed in card formt, with highlights of their overall statistics, from who the project owner is (Client users), to the number of surveys included and data points of interest
    - From this view the admin can update, create, copy, and delete current projects
    - Beneath each project is a link to view statistical visualizations for the surveys in the project, or render a MapBox map of surveys by health area
    - Utilizes an initial fetch, transferred to Redux store, with infinite scroll built on an autosizer & react-window
- New Project Creation
    - TBW
- Update Projects (implicit creation)
    - TBW
- Data Sets View
    - Users first see a table of the datasets currently in the database, including basic details, and buttons to edit & delete dataset
    - At the bottom of the page users can find a button to upload a new data set, which will take them to a new page with a dropzone that will accept only three file types: .csv, .dta, and .csv.zip
    - Once a file has been uploaded, users will be prompted to choose a name and confirm the upload, at which point the file is pushed to the backend, file structure is normalized to a .csv string, and written into the database
- Users View
Users view: 
    - A view allowing admin to see all current clients & LB users
    - Button to add new user - a modal to create a new user, with type (admin, client, LB), email, password, etc
### Reporting:
- A violin plot able to display data on interview duration, don't know responses, integer outlier data points, and distance outliers
    - Render all four versions of the violin in one page, with navlink titles allowing the user to click a report title and render the plot on it's own page
- Render a MapBox map with an infinite scroll set of health areas, which when clicked will zoom the map & display that set of surveys as icons. :
    - time stamp of the survey
    - the surveyor code
    - respondent name
    - length of the survey
    - number of outlier data points & "Don't know"'s
### CRUD
  - A data review form to mark data points that fall 2 standard deviations outside the mean as either plausible or implausible
    * once completed, alow admin to add that data to a LB user, so they can update the data with field reps
  - Upload Stata data & generate a set of reports automatically
  - TBW

## Routes (NEEDS REWRITE)
 - User auth
     - Login Post (/auth/login)
     - New user Post (/auth/new-user)
 - Users
     - Users get (/api/users/<< userId >>/users)
 - Data sets:
     - Route to get all datasets (/api/data)
     - Route for specific reports
          - Violin-plot (/api/user/<< userId >>/data/<< datasetId >>/violinplot/<< field_string >> - field_string referring to the field on the survey datatable that you want to run the plot on, i.e. length, )
          - Menage (/api/user/<< userId >>/data/<< datasetId >>/menageplot/<id=3>) (**V2**)
          - Bar chart (/api/user/<< userId >>/data/<< datasetId >>/barchart/<id=1>) (**V2**)
     - Post route for new data upload (/api/user/<< userId >>/data)
         - Very complicated, needs to parse data input into datasets (easy), enumerators table, surveys table, problem_survey_responses table (**V2**)
     - Put route for LB user data updates (/api/user/<< userId >>)
     - Put route for admin data approval (maybe)
  - Mapbox:
      - Route to get specific surveyor's data from a specific survey (api/data/<< datasetId >>/enumerator/<< enumeratorId >>/map)
 
## Schema
![](https://github.com/nappernick/envelope/blob/master/wiki_readme_resources/envelop_db_schema.png?raw=true)
## Python Analysis (
 - TBW

## Technologies
- Python
- Pandas
- React
- Flask
- Postgres
- SQLAlchmey
- ChartJS (https://github.com/datavisyn/chartjs-chart-box-and-violin-plot or https://github.com/sgratzl/chartjs-chart-boxplot)
- React Modals
- Mapbox GL JS API


# V2
### Admin Tools:
- Users view: 
  - A left hand column of current projects (which represent datasets & their reports) which can be dragged onto a user, giving that user access
### Reporting:
  - 2 box plots (would like to implement violin plots instead if possible), one menage of box plots (a chart of box plots with surveyor on x axis), one bar chart per section below (this is recreating what is currently sent out to clients). Should need to create a component for each, then just change input data.
    1. Interview duration
    2. "Don't know" responses
    3. Integer outlier data points
    4. Average distance (only histogram)
    5. Distance outliers (only 1 box plot, otherwise the same)
  - For each project (which will have a set of surveys completed) show a map of the survey area (denoted with a circle) with: 
    - the routes of each surveyor
    - a link to view a table of the outlier/don't know rows with a checkbox to say "plausible" (**stretch**)
    - if the survey is a panel (meaning surveying the same family multiple times over the course of years), the distance of that current survey from the last survey of that family (**stretch**)
    - Ability to export that as a KML file (**stretch**)
  - Report by surveyor showing their trend, since they began surveying, for number of don't knows/outlier data points, y axis showing the number of "issue" data points, and a point on the graph for every survey they've taken (**stretch**)
  - Make outlier data points in box plots clickable, to open a report view for that specific outlier  (**stretch**)
### CRUD
  - A low bandwidth form to allow LB users to login & view sets of data that need to be updated, then update those values (could also generate a csv & allowing the user to download it, edit, and upload it once complete - offline is huge in Sudan) (**will only implement either form or csv, other will be stretch**)
  - Once completed by LB user, update the admin user with very simple notification email or in app notification  (**stretch**)
   - for those fields where correct data was retrieved, update the data set automatically (alt. could have admin user view & approve those updates) with new data.  Where data could not be found, add a note to the survey compilation/summary with surveyor number, respondent name, and field where data could not be gotten.
  - Once performed, update the client user with a notification (email or in app) that their reports have been updated (**stretch**)

  

