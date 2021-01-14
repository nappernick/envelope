import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import { signup } from '../../store/session';

const SignUpForm = ({ closeModal }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([])
  const [typeId, setTypeId] = useState(0)
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signup({
        username,
        email,
        password,
        firstName,
        lastName,
        typeId
      })).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    }
    closeModal()
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const fetchedTypes = await fetch("/api/users/types")
      const typesListObjs = await fetchedTypes.json()
      setTypes(typesListObjs)
    })()
  }, [])

  return (
    <form onSubmit={onSignUp}>
      <div className={"sign_up__errors container"}>
        {errors.map((error) => (
          <div className={"sign_up__errors error"}>{error}</div>
        ))}
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Type</label>
        <Select options={types} onChange={(values) => {
          setTypeId(values.value)
        }} />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
