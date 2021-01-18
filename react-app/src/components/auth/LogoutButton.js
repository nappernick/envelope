import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/session"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
    // return <Redirect to="/login" />
  };

  return <div className="navbar__logout" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
