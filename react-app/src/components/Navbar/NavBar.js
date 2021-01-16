import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import Select from "react-select";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import LogoutButton from '../Auth/LogoutButton';
import { logout } from "../../store/session";
import 'rc-dropdown/assets/index.css';
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';


const NavBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [projects, setProjects] = useState([])
  const authenticated = useSelector(state => state.session.user)

  const menuCallback = () => (
    <Menu style={{ cursor: "pointer" }}>
      <MenuItem style={{ cursor: "pointer" }} key="1" onClick={() => {
        dispatch(logout())
      }}>
        <LogoutButton />
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
          <i className="fas fa-envelope fa-3x"></i>
        </div>
        <div className="navbar__search">
          <Select
            options={projects}
            isSearchable={true}
            theme={theme => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#edbb43",
                primary25: "#ffac54",
                // primary50: "#e98641"
              }
            })}
            placeholder="Search Projects... "
            onChange={(values) => {
              return history.push(`/users/${authenticated.id}/projects/${values.value}`)
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
          {(authenticated && authenticated.type_id === 1) && <li className="navbar__link">
            <NavLink to="/data-sets" exact={true} activeClassName="active">
              Data Sets
          </NavLink>
          </li>}
          {(authenticated && authenticated.type_id === 1) && <li className="navbar__link">
            <NavLink to="/projects" exact={true} activeClassName="active">
              All Projects
          </NavLink>
          </li>}
          {(authenticated && authenticated.type_id === 2) && <li className="navbar__link">
            <NavLink to={`/users/${authenticated.id}/projects`} exact={true} activeClassName="active">
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
                <div>{authenticated.first_name}</div>
              </Dropdown>
            </div>
          </li>}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
