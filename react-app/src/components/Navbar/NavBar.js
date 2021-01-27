import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from "react-select";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import LogoutButton from './LogoutButton';
import 'rc-dropdown/assets/index.css';
import "./NavBar.css"
import logo from "./envelopeLogo.png"

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    width: "350px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px'
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
  }),
}

const NavBar = () => {
  const history = useHistory()
  const [projects, setProjects] = useState([])
  const [path, setPath] = useState("")
  const authenticated = useSelector(state => state.session.user)

  const menuCallback = () => (
    <Menu style={{ cursor: "pointer" }}>
      <MenuItem
        style={{ cursor: "pointer" }}
        key="1"
      >
        <LogoutButton />
      </MenuItem>
    </Menu >
  );

  useEffect(() => {
    (async () => {
      const projectsFetch = await fetch("/api/projects/search")
      const projects = await projectsFetch.json()
      setProjects(projects)
    })()
  }, [])

  useEffect(() => {
    setPath(history.location.pathname)
  }, [history])

  return (
    <nav>
      <ul className="navbar__container">
        {!authenticated && <div className="navbar__logo">
          <i className="fas fa-envelope fa-3x"></i>
        </div>}
        {authenticated && <div className="navbar__logo">
          <img src={logo} alt="Envelope Logo" />
        </div>}
        <div className="navbar__search">
          <Select
            styles={customStyles}
            options={projects}
            isSearchable={true}
            theme={theme => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#fbb430",
                primary25: "#fbb430",
                // primary50: "#e98641"
              }
            })}
            placeholder="Search Projects... "
            onChange={(values) => {
              // return history.push(`/users/${authenticated.id}/projects/${values.value}`)
              return history.push(`/projects`)
            }} />
        </div>
        <div className="navbar__links">
          {!authenticated && <div
            className={path === "/login" ? `navbar__link on` : "navbar__link"}
            onClick={() => setPath(history.location.pathname)}
          >
            <NavLink to="/login" exact={true} >
              Login
          </NavLink>
          </div>}
          {(authenticated && authenticated.type_id === 1) && <div
            className={path === "/users" ? `navbar__link on` : "navbar__link"}
            onClick={() => setPath(history.location.pathname)}
          >
            <NavLink to="/users" exact={true}>
              Users
          </NavLink>
          </div>}
          {(authenticated && authenticated.type_id === 1) && <div
            className={path === "/data-sets" ? `navbar__link on` : "navbar__link"}
            onClick={() => setPath(history.location.pathname)}
          >
            <NavLink to="/data-sets" exact={true} >
              Data Sets
          </NavLink>
          </div>}
          {(authenticated && authenticated.type_id === 1) && <div
            className={path === "/projects" ? `navbar__link on` : "navbar__link"}
            onClick={() => setPath(history.location.pathname)}
          >
            <NavLink to="/projects" exact={true} >
              All Projects
          </NavLink>
          </div>}
          {(authenticated && authenticated.type_id === 2) && <div
            className={path === `/users/${authenticated.id}/projects` ? `navbar__link on` : "navbar__link"}
            onClick={() => setPath(history.location.pathname)}
          >
            <NavLink to={`/users/${authenticated.id}/projects`} exact={true} >
              My Projects
          </NavLink>
          </div>}
          {authenticated && <div className="navbar__link">
            <div className="navbar__user" style={{ cursor: "pointer" }}>
              <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
              >
                <div>{authenticated.first_name}</div>
              </Dropdown>
            </div>
          </div>}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
