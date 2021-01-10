import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Select from "react-select";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import LogoutButton from '../auth/LogoutButton';
import { logout } from "../../services/auth";
import 'rc-dropdown/assets/index.css';
import "./NavBar.css"


const NavBar = ({ setAuthenticated, authenticated, user }) => {
  console.log(user)
  console.log("authenticated?", authenticated)
  const [projects, setProjects] = useState([])

  const menuCallback = () => (
    <Menu style={{ cursor: "pointer" }}>
      <MenuItem style={{ cursor: "pointer" }} key="1" onClick={() => {
        logout()
      }}>
        <LogoutButton setAuthenticated={setAuthenticated} />
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    (async () => {
      const projectsFetch = await fetch("/api/projects/search")
      const projects = await projectsFetch.json()
      setProjects(projects)
    })()
  }, [])

  return (
    <nav>
      <ul className="navbar__container">
        <div className="navbar__logo">
          <i className="fas fa-envelope fa-4x"></i>
        </div>
        <div className="navbar__search">
          <Select
            options={projects}
            theme={theme => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#ecceda",
                primary25: "B8BBC3",
                primary50: "636F84"
              }
            })}
            placeholder="Search Projects... "
            onChange={(values) => {
            }} />
        </div>
        <div className="navbar__links">
          {!authenticated && <li className="navbar__link">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
          </NavLink>
          </li>}
          {!authenticated && <li className="navbar__link">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
          </NavLink>
          </li>}
          {authenticated && <li className="navbar__link">
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
          </NavLink>
          </li>}
          {(authenticated && user && user.type_id === 1) && <li className="navbar__link">
            <NavLink to="/projects" exact={true} activeClassName="active">
              All Projects
          </NavLink>
          </li>}
          {(authenticated && user && user.type_id === 2) && <li className="navbar__link">
            <NavLink to={`/users/${user.id}/projects`} exact={true} activeClassName="active">
              My Projects
          </NavLink>
          </li>}
          {authenticated && <li className="navbar__link">
            <div className="navbar__user" style={{ cursor: "pointer" }}>
              <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
              >
                <div>{user.first_name}</div>
              </Dropdown>
            </div>
          </li>}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
