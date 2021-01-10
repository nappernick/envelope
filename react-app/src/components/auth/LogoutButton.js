import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <div className="navbar__logout" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
