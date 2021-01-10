import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData);
    }
    fetchData();
  }, []);

  const userComponents = users ? users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  }) : null

  return (
    <>
      <h1>User List: </h1>
      <ul>{users && users.length && userComponents}</ul>
    </>
  );
}

export default UsersList;
