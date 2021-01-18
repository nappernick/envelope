import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session"

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
    history.push("/login")
  };

  return <div className="navbar__logout" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
