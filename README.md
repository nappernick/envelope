# Envelope - non-profit data processing, visualizations, and multi-location mapping

<img src="./react-app/src/assets/logo.png" />

**Envelope** is a full-stack application for non-profits to analyze large datasets & build reporting for external partners that feature interactive mapping & beautiful visualizations.

## Check it out
Wanna see it in action? [Click here & use the demo login button](https://envelope-visx.herokuapp.com)

## Technologies
<h5>Font End</h5>
<a href="#"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" /></a>
<a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" /></a>
<a href="https://https://reactrouter.com//"><img alt="React Router" src="https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=React-Router&logoColor=white" /></a>
<a href="https://www.mapbox.com///"><img alt="Mapbox" src="https://img.shields.io/badge/-Mapbox-000000?style=flat-square&logo=Mapbox&logoColor=white" /></a>
<h5>Back End</h5>
<a href="https://flask.palletsprojects.com/en/1.1.x/"><img alt="Flask" src="https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=Flask&logoColor=white" /></a>
<a href="https://www.python.org/"><img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white&" /></a>
<a href="https://pandas.pydata.org/"><img alt="Pandas" src="https://img.shields.io/badge/-Pandas-150458?style=flat-square&logo=pandas&logoColor=white" /></a>
<a href="https://numpy.org/"><img alt="NumPy" src="https://img.shields.io/badge/-NumPy-150458?style=flat-square&logo=NumPy&logoColor=white" /></a>
<a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" /></a>
<h5>Deployment and Package Management</h5>
<a href="https://heroku.com/"><img alt="Heroku" src="https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=Heroku&logoColor=white" /></a>
<a href="https://docker.com/"><img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" /></a>
<a href="#"><img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" /></a>
<a href="https://www.npmjs.com/"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>


## Usage

### Development

Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository
- Create a new branch with `git checkout -b feature-branch-name`
- Make appropriate changes to the files and push back to github
- Create a Pull Request
   - Use a clear and descriptive title for the issue to identify the suggestion.
   - Include any relevant issue numbers in the PR body, not the title.
   - Provide a comprehensive description of all changes made.

#### Setting Up and Starting a Local Server

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/nappernick/envelope.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, in a separate terminal:

   ```
   cd client
   ```

   ```
   npm install
   ```

   ```
   npm start
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Deployment to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.


### Bug / Feature Request

We love squashing bugs! If you find one, let our exterminators know by opening an issue [here](https://github.com/nappernick/envelope/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug). Screenshots or recordings greatly help!

If you'd like to request a new feature open up an issue [here](https://github.com/nappernick/envelope/issues). This project was created as part of [App Academy's](https://www.appacademy.io/) coursework, but we love dreaming up of ways to improve our work.


## Built By

[Nick Matthews](https://github.com/nappernick)


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

  

