import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from './store/session';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import MapPage from "./components/map/MapPage";

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user)
  // const [user, setUser] = useState()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(sessionActions.restore())
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }
  console.log("APP LEVEL:", authenticated)

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
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/projects" exact={true} authenticated={authenticated}>
          {/* Component that shows this all projects, only available to admin users */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects" exact={true} authenticated={authenticated}>
          {/* Component that shows this user's projects */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/stats" exact={true} authenticated={authenticated}>
          {/* Component that renders all statistics */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/stats/:statsString" exact={true} authenticated={authenticated}>
          {/* Component that renders specific, selected graph/plot */}
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/projects/:projectsId/map" exact={true} authenticated={authenticated}>
          <MapPage />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
