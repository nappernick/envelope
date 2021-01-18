import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { signup } from '../../../store/session';
import "./SignupForm.css"

const SignUpForm = ({ closeModal, setUsers, users }) => {
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
  const [disabled, setDisabled] = useState(true)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          "first_name": firstName,
          "last_name": lastName,
          "type_id": typeId,
        }),
      });
      const res = await response.json()
      if (res.data && res.data.errors) return setErrors(res.data.errors)
      else {
        const usersCopy = [...users]
        usersCopy.push(res)
        setUsers(usersCopy)
      }
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

  useEffect(() => {
    if (username && firstName && lastName && email && password && repeatPassword && password === repeatPassword) setDisabled(false)
    if (!username || !firstName || !lastName || !email || !password || !repeatPassword || password != repeatPassword) setDisabled(true)
  }, [username, firstName, lastName, email, password, repeatPassword])

  return (
    <div className="signup_form__container">
      <form
        onSubmit={onSignUp}
        autocomplete="off"
      >
        <div className="signup_form__header header">
          <p>CREATE NEW USER</p>
        </div>
        <div className={"sign_up__errors container"}>
          {errors.map((error) => (
            <div className={"sign_up__errors error"}>{error}</div>
          ))}
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Username</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">First Name</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="text"
            name="firstName"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Last Name</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="text"
            name="lastName"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Type</label>
          <Select
            styles={{ width: "200px" }}
            className="signup_form__input input select"
            options={types}
            onChange={(values) => {
              setTypeId(values.value)
            }}
          />
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Email</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Password</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="signup_form__field field">
          <label className="signup_form__label title">Confirm Password</label>
          <input
            autocomplete="off"
            className="signup_form__input input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="signup_form__submit button">
          <button
            type="submit"
            disabled={disabled}
          >Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
