import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session"

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    const res = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const userMsg = await res.json()
    if (!userMsg["errors"]) {
      dispatch(logout())
      history.push("/login")
    }
    else {
      window.alert("Unable to log you out! Please refresh the page & try again.")
    }
  };

  return <div className="navbar__logout" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
