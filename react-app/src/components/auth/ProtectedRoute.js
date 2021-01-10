import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const sessionUser = useSelector(store => store.session.user)
  return (
    <Route >
      {sessionUser ? props.children : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
