import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from './store/session';
import { setAllProjects } from './store/projects'
import { setAllDataSets } from "./store/data_sets"
import { areas } from "./common/areas"
import { trackPromise } from "react-promise-tracker";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/Users/UsersList";
import User from "./components/Users/User";
import MapPage from "./components/Maps/MapPage";
import AllProjects from "./components/Projects/AllProjects";
import FileUpload from "./components/Data/FileUpload";
import Violinplot from "./components/Stats/ViolinPlot";

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user)
  // const [user, setUser] = useState()
  const [loaded, setLoaded] = useState(false);
  console.log(user)

  useEffect(() => {
    (async () => {
      dispatch(sessionActions.restore())
      setLoaded(true);
      dispatch(setAllDataSets())
    })();
    (async () => {
      trackPromise(dispatch(setAllProjects()), areas.projects)
    })()
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/users" exact={true} authenticated={user}>
          <UsersList />
        </Route>
        <Route path="/users/:userId" exact={true} authenticated={user}>
          <User />
        </Route>
        <Route path="/data-sets" exact={true} authenticated={user}>
          {/* Component that shows this all projects, only available to admin users */}
        </Route>
        <Route path="/data-sets/upload" exact={true} authenticated={user}>
          <FileUpload />
        </Route>
        <Route path="/projects" exact={true} authenticated={user}>
          <AllProjects />
        </Route>
        <Route path="/users/:userId/projects" exact={true} authenticated={user}>
          {/* Component that shows this user's projects */}
        </Route>
        <Route path="/users/:userId/projects/:projectId" exact={true} authenticated={user}>
          {/* Component that shows a specific project in detail */}
        </Route>
        <Route path="/users/:userId/projects/:projectId/stats" exact={true} authenticated={user}>
          <Violinplot />
        </Route>
        <Route path="/users/:userId/projects/:projectId/stats/:statsString" exact={true} authenticated={user}>
          <Violinplot />
        </Route>
        <Route path="/users/:userId/projects/:projectId/map" exact={true} authenticated={user}>
          <MapPage />
        </Route>
        <Route path="/" exact={true} authenticated={user}>
          <Redirect to="/projects" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
