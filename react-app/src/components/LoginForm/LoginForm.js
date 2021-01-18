import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({
      email,
      password
    })).catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) })
    // const user = await login(email, password);
    // if (!user.errors) {
    //   setAuthenticated(true);
    // } else {
    //   setErrors(user.errors);
    // }
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

      </div>
      <div className="login_form__container right container">
        <form onSubmit={onLogin}>
          <div className="login_form__errors container">
            {errors.map((error) => (
              <div className="login_form__errors error">{error}</div>
            ))}
          </div>
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
          <div className="login_form__button button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
