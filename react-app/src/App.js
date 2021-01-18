import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from './store/session';
import { setAllProjects } from './store/projects'
import { setAllDataSets } from "./store/data_sets"
import { areas } from "./common/areas"
import { trackPromise } from "react-promise-tracker";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/Users/SignupForm/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import UsersList from "./components/Users/UsersList";
import MapPage from "./components/Maps/MapPage";
import AllProjects from "./components/Projects/AllProjects";
import FileUpload from "./components/Data/FileUpload/FileUpload";
import Violinplot from "./components/Stats/ViolinPlot";
import AllDataSets from "./components/Data/AllDataSets";
import StatsPage from "./components/Stats/StatsPage";
import Footer from "./components/Footer/Footer";

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user)
  // const [user, setUser] = useState()
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    (async () => {
      dispatch(setAllDataSets())
    })();
    (async () => {
      trackPromise(dispatch(setAllProjects()), areas.projects)
    })()
  }, [dispatch, user]);

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
          {user ? <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users" exact={true} authenticated={user}>
          {user ? <UsersList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/data-sets" exact={true} authenticated={user}>
          {user ? <AllDataSets /> : <Redirect to="/login" />}
        </Route>
        <Route path="/data-sets/upload" exact={true} authenticated={user}>
          {user ? <FileUpload /> : <Redirect to="/login" />}
        </Route>
        <Route path="/projects" exact={true} authenticated={user}>
          {user ? <AllProjects /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:userId/projects" exact={true} authenticated={user}>
          {/* Component that shows this user's projects */}
        </Route>
        <Route path="/users/:userId/projects/:projectId" exact={true} authenticated={user}>
          {/* Component that shows a specific project in detail */}
        </Route>
        <Route path="/users/:userId/projects/:projectId/stats" exact={true} authenticated={user}>
          {user ? <StatsPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:userId/projects/:projectId/stats/:statsString" exact={true} authenticated={user}>
          {user ? <Violinplot /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:userId/projects/:projectId/map" exact={true} authenticated={user}>
          {user ? <MapPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/" exact={true} authenticated={user}>
          {user ? <Redirect to="/projects" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
