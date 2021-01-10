import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from './store/session';
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import MapPage from "./components/Maps/MapPage";
import AllProjects from "./components/Projects/AllProjects";

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
    })();
  }, []);

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
        <ProtectedRoute path="/users" exact={true} authenticated={user}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={user}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/data-sets" exact={true} authenticated={user}>
          {/* Component that shows this all projects, only available to admin users */}
        </ProtectedRoute>
        <ProtectedRoute path="/projects" exact={true} authenticated={user}>
          <AllProjects />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects" exact={true} authenticated={user}>
          {/* Component that shows this user's projects */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/stats" exact={true} authenticated={user}>
          {/* Component that renders all statistics */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/stats/:statsString" exact={true} authenticated={user}>
          {/* Component that renders specific, selected graph/plot */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/map" exact={true} authenticated={user}>
          <MapPage />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={user}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
