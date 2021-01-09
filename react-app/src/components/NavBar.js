import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav>
      <ul>
        <li className="navbar__link">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {!authenticated && <li className="navbar__link">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>}
        <li className="navbar__link">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li className="navbar__link">
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
