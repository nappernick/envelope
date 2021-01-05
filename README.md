# envelope - non-profit dashboard & reporting
## MVP
### Three types of users: 
 - Admin user with access to all data sets & reports (not direct data access, but the data necessary to render reports)
 - Client users with access to their specific data sets & reports
 - Low bandwidth (LB) users who need very limited data / functionality
### Admin Tools:
- Users view: 
  - A view allowing admin to see all current clients & LB users
  - Button to add new user - either a modal with a "type of user" select at the top, which then renders input fields for one type or the other, or two buttons, one for a client user, one for an LB user, or the easiest, one button, with a checkbox on user type, and stadardized fields for both user types
  - A left hand column of current projects (which represent datasets & their reports) which can be dragged onto a user, giving that user access 
- Upload Stata data & generate a set of reports automatically
### Reporting:
  - 3 box plots (would like to implement violin plots instead if possible), one bar chart per data set (this is recreating what is currently sent out to clients)
  - For each project (which will have a set of surveys completed) show a google map of the survey area (denoted with a circle) with: 
    - the routes of each surveyor
    - a clickable dot/icon at each location a survey was administered allowing the user to click & see the time stamp of the survey, the surveyor code, respondent name, length of the survey, number of outlier data points & "Don't know"'s 
    - a link to view a table of the outlier/don't know rows with a checkbox to say "plausible"
    - if the survey is a panel (meaning surveying the same family multiple times over the course of years), the distance of that current survey from the last survey of that family
    - Ability to export that as a KML file
  - Report by surveyor showing their trend, since they began surveying, for number of don't knows/outlier data points, y axis showing the number of "issue" data points, and a point on the graph for every survey they've taken
## CRUD
  - A data review form to mark data points that fall 2 standard deviations outside the mean as either plausible or implausible
    * once completed, alow admin to add that data to a LB user, so they can update the data with field reps
  - A low bandwidth form to allow LB users to login & view sets of data that need to be updated, then update those values (could also generate a csv & allowing the user to download it, edit, and upload it once complete - offline is huge in Sudan)
  - Once completed by LB user, update the admin user -> for those fields where correct data was retrieved, update the data set automatically (alt. could have admin user view & approve those updates) with new data.  Where data could not be found, add a note to the survey compilation/summary with surveyor number, respondent name, and field where data could not be gotten.
  - Once performed, update the client user with a notification (email or in app) that their reports have been updated
  

## Extended Feature Ideas
### 


## Technologies
- Python
- React
- Flask
- Postgre
- SQLAlchmey
- ChartJS (https://github.com/datavisyn/chartjs-chart-box-and-violin-plot or https://github.com/sgratzl/chartjs-chart-boxplot)
- React Modals
- 
