import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./SignupFormModal.css"

const SignUpForm = ({ closeModal, setUsers, users, user }) => {
  console.log(user)
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([])
  const [typeId, setTypeId] = useState(user ? user.type_id : 0)
  const [username, setUsername] = useState(user ? user.username : "");
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disabled, setDisabled] = useState(true)

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    // update a user
    if (user && user.id && password === repeatPassword) {
      console.log(password)
      const response = await fetch(`/api/users/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          "password": `${password}`,
          "first_name": firstName,
          "last_name": lastName,
          "type_id": typeId,
        }),
      });
      const res = await response.json()
      console.log(res)
      if (res && res.errors) return setErrors(res.errors)
      else {
        const usersCopy = users.filter(el => el.id !== res.id)
        usersCopy.push(res)
        setUsers(usersCopy)
        closeModal()
      }
      // create a new user
    } else if (password === repeatPassword) {
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
        closeModal()
      }
    } else {
      setErrors(["Your passwords don't match!"])
    }
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
    if (!username || !firstName || !lastName || !email || !password || !repeatPassword || password !== repeatPassword) setDisabled(true)
  }, [username, firstName, lastName, email, password, repeatPassword])

  return (
    <div className="signup_form__container">
      <form
        onSubmit={onSignUp}
        autocomplete="off"
      >
        <div className={"sign_up__errors container"}>
          {errors.map((error) => (
            <div className={"sign_up__errors error"}>{error}</div>
          ))}
        </div>
        <div className="signup_form__header header">
          {user ? <p>UPDATE USER</p> : <p>CREATE NEW USER</p>}
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
            // If this is a 
            defaultValue={user && user.id ? {
              "value": user.type_id,
              "label": user.type
            } : ""}
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
          >{user && user.id ? "Update User" : "Sign Up"}</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
