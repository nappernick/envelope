import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from '../../../store/session';
import bigLogo from "./bigLogo.png"
import "./LoginForm.css"

const LoginForm = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoLogin = async (e) => {
    onLogin(e, "demo@aa.io", "password")
  }

  const onLogin = async (e, em, pw) => {
    e.preventDefault();
    // setErrors([]);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": em ? em : email,
        "password": pw ? pw : password
      })
    });
    const res = await response.json()
    console.log(email)
    if (res["errors"]) setErrors(res["errors"])
    else dispatch(login(res))
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_form__outermost container">
      <div className="login_form__container left container">
        <div className="login_form__logo_text container">
          <img src={bigLogo} alt="" />
          <div className="login_form__text">
            <p>Designed for processing large data-sets, mapping, and visualizations in the nonprofit world. Powerful data analysis, beautiful visualizations, easy, interactive location maps.</p>
            <p>Free & open-source, forever.</p>
          </div>
        </div>
      </div>
      <div className="login_form__container right container">
        <form onSubmit={onLogin}>
          <div className="login_form__errors container">
            {errors.map((error) => (
              <div className="login_form__errors error">{error.split(":")[1]}</div>
            ))}
          </div>
          <div className="login_form__input_submit">
            <div className="login_form__input_container">
              <div className="login_form__input container">
                <div className="login_form__input title">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="login_form__input input">
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
              </div>
              <div className="login_form__input container">
                <div className="login_form__input title">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="login_form__input input">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
              </div>
            </div>
            <div className="login_form__button button">
              <button type="submit">Login</button>
            </div>
            <div className="login_form__button button">
              <button
                type="submit"
                onClick={demoLogin}
              >Demo Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
