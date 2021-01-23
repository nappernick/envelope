import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../Loaders/Spinner"
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import Modal from "react-modal"
import SignUpForm from "./SignupForm/SignUpForm";
import "./UsersList.css"

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '70%',
    right: '40%',
    bottom: 'auto',
    height: "75%",
    marginRight: '-50%',
    paddingTop: "0px",
    transform: 'translate(-100%, -50%)',
    border: 'none',
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
  },
};


function UsersList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData);
    }
    trackPromise(fetchData(), areas.userList);
  }, []);

  const userComponents = users ? (
    <table className="users_list__user">
      <thead className="users_list__titles">
        <tr className="users_list__user row">
          <th className="users_list__user header">
            Username
          </th>
          <th className="users_list__user header">
            First Name
          </th>
          <th className="users_list__user header">
            Last Name
          </th>
          <th className="users_list__user header email">
            Email
          </th>
          <th className="users_list__user header">
            Type
          </th>
        </tr>
      </thead>
      <tbody className="users_list__rows">
        {users.map((user) => {
          return (

            <tr className="users_list__user row" key={user.id} >
              <td className="users_list__user data username">
                {user.username}
              </td>
              <td className="users_list__user data">
                {user.first_name}
              </td>
              <td className="users_list__user data">
                {user.last_name}
              </td>
              <td className="users_list__user data email">
                {user.email}
              </td>
              <td className="users_list__user data">
                {user.type}
              </td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  ) : ""

  return (
    <>
      <div className="users_list__container">
        <div className="users_list__list_container">
          <div className="users_list___header">
            <p>User List</p>
          </div>
          <div className="users_list__list">
            <div>
              <Spinner areas={areas.userList} />
              {users && users.length > 0 && userComponents}
            </div>
          </div>
        </div>
        <div className="users_list__new_user container">
          <div className="users_list__new_user button">
            <button onClick={openModal}>New User</button>
          </div>
          <div className="users_list__new_user modal">
            <Modal
              isOpen={showModal}
              onRequestClose={closeModal}
              style={customStyles}
              closeTimeoutMS={300}
              contentLabel="New User Upload Modal"
            >
              <SignUpForm closeModal={closeModal} users={users} setUsers={setUsers} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
