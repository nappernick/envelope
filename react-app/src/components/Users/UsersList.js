import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../Spinner"
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import Modal from "react-modal"
import SignUpForm from "../Auth/SignUpForm";

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '40%',
    left: '70%',
    right: '40%',
    bottom: 'auto',
    height: "45%",
    marginRight: '-50%',
    paddingTop: "0px",
    transform: 'translate(-100%, -50%)',
    border: '1px solid lightgrey',
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
  }
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
  }, [showModal]);

  const userComponents = users ? (
    <table className="users_list__user">
      <tr className="users_list__user header">
        <th className="users_list__user header">
          Username
          </th>
        <th className="users_list__user header">
          First Name
          </th>
        <th className="users_list__user header">
          Last Name
          </th>
        <th className="users_list__user header">
          Email
          </th>
        <th className="users_list__user header">
          Type
          </th>
      </tr>
      {users.map((user) => {
        return (
          <tr className="users_list__user row">
            <td className="users_list__user row">
              <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
            </td>
            <td className="users_list__user row">
              {user.first_name}
            </td>
            <td className="users_list__user row">
              {user.last_name}
            </td>
            <td className="users_list__user row">
              {user.email}
            </td>
            <td className="users_list__user row">
              {user.type}
            </td>
          </tr>
        )
      })}
    </table>
  ) : ""

  return (
    <>
      <div className="users_list__container">
        <div className="users_list__list_container">
          <div className="users_list___header">
            <h1>User List: </h1>
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
              contentLabel="New User Upload Modal"
            >
              <SignUpForm closeModal={closeModal} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
