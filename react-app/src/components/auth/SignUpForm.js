import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import { signUp } from '../../services/auth';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [types, setTypes] = useState([])
  const [typesObj, setTypesObj] = useState({})
  const [selectedType, setSelectedType] = useState("")
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
      console.log(typeId)
      const user = await signUp(username, email, password, firstName, lastName, typeId);
      if (!user.errors) {
        setAuthenticated(true);
      }
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
      let typesObj = {}
      let types = typesListObjs.map(type => {
        typesObj[Object.keys(type)[0]] = Object.values(type)[0]
        return Object.keys(type)[0]
      })
      setTypesObj(typesObj)
      setTypes(types)
    })()
  }, [])


  if (authenticated) {
    return <Redirect to="/" />;
  }
  console.log(typesObj[selectedType])

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
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
          let type_id = typesObj[values]
          setTypeId(type_id)
          setSelectedType(values)
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
