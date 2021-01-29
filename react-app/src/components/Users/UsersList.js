import React, { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Loaders/Spinner"
import { areas } from "../../common/areas";
import Modal from "react-modal"
import SignUpForm from "./SignupForm/SignUpFormModal";
import { removeProject } from "../../store/projects";
import "./UsersList.css"
import ThreeBounce from "better-react-spinkit/dist/ThreeBounce";

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '71.5%',
    right: 'auto',
    width: "550px",
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
  const dispatch = useDispatch()
  const projects = useSelector(store => store.projects)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { promiseInProgress } = usePromiseTracker({
    area: "delete-data-set",
    delay: 0,
  });

  const handleDelete = (e, id) => {
    e.preventDefault()
    const deleteFetch = async () => {
      let post = await fetch(`/api/users/${id}`, {
        method: "DELETE"
      })
      const res = await post.json()
      if (!res.errors) {
        const newUsers = users.filter(el => el.id !== id)
        setUsers(newUsers)
      }
    }
    trackPromise(deleteFetch(), areas.deleteDS)
    // Removing all associated projects from the store
    projects.forEach(project => {
      if (project.user_id === id) {
        dispatch(removeProject(project.id))
        fetch(`/api/projects/${project.id}`, { method: "DELETE" })
      }
    })
  }

  const openModal = (user) => {
    setShowModal(true)
    setUser(user)
  }
  const closeModal = () => {
    setShowModal(false)
    setUser(null)
  }

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
          <th className="users_list__user header button">
            Update
          </th>
          <th className="users_list__user header button">
            Delete
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
              <td className="users_list__user button">
                <div className="users_list__user data button" >
                  <button className="users_list__user button" onClick={(e) => openModal(user)} >Update</button>
                </div>
              </td>
              <td className="users_list__user button">
                {promiseInProgress ?
                  <div className="spinner">
                    <ThreeBounce
                      size={15}
                      color="#e98641"
                      duration=".7s"
                    />
                  </div> :
                  <div className="users_list__user data button" >
                    <button className="users_list__user delete"
                      onClick={(e) => handleDelete(e, user.id)}
                    >Delete</button>
                  </div>}
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
        <div className="users_list__wrapper">
          <div className="users_list___header">
            <p>User List</p>
          </div>
          <div className="users_list__list">
            <Spinner areas={areas.userList} />
            {users && users.length > 0 && userComponents}
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
              <SignUpForm closeModal={closeModal} users={users} setUsers={setUsers} user={user} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
