import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
  };

  return <div className="navbar__logout" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
