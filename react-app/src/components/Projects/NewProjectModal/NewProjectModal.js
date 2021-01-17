import React, { useEffect, useState } from 'react'
import Spinner from "../../Loaders/Spinner"
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../../common/areas";
import UserListForm from '../ModalComponents/UserListForm';
import { useDispatch, useSelector } from 'react-redux';
import DataSetsListForm from '../ModalComponents/DataSetsListForm';
import { singleProjectPost, multiProjectPost } from "../ProjectUtils"
import { addProject } from '../../../store/projects';
import "./NewProject.css"

function NewProjectModal({ closeModal }) {
    const dispatch = useDispatch()
    const dataSets = useSelector(store => store.dataSets)
    const [errors, setErrors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedDataSetId, setSelectedDataSetId] = useState(null)
    const [projectName, setProjectName] = useState("")
    const sessUser = useSelector(store => store.session.user)
    const [disabled, setDisabled] = useState(true)
    const selectedObj = {
        "selectedUsers": selectedUsers,
        "setSelectedUsers": setSelectedUsers
    }
    const dataSetsObj = {
        "dataSets": dataSets,
        "setSelectedDataSetId": setSelectedDataSetId
    }

    const handleSubmit = async (e) => {
        if (selectedUsers.length == 1) {
            const project = singleProjectPost(projectName, selectedDataSetId, selectedUsers[0]["id"], setErrors)
            dispatch(addProject(project))
        }
        else {
            selectedUsers.forEach(user => {
                const project = multiProjectPost(projectName, selectedDataSetId, user, setErrors)
                dispatch(addProject(project))
            })

        }
        closeModal()
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`/api/users/${sessUser.id}/clients`);
            const responseData = await response.json();
            // if (!responseData["errors"]) setUsers(responseData);
            setUsers(responseData);
        }
        trackPromise(fetchUsers(), areas.userList)
    }, []);

    useEffect(() => {
        if (projectName && selectedUsers.length > 0 && selectedDataSetId) setDisabled(false)
        if (!projectName || selectedUsers.length > !0 || !selectedDataSetId) setDisabled(true)
    }, [projectName, selectedUsers, selectedDataSetId])

    return (
        <>
            <div className="projects_modal__container">
                <div className={"projects_modal__errors container"}>
                    {errors.map((error) => (
                        <div className={"projects_modal__errors error"}>{error}</div>
                    ))}
                </div>
                <div className="projects_modal__header">
                    <p>NEW PROJECT</p>
                </div>
                <div className="projects_modal__user container">
                    <div className="projects_modal__users header">
                        Users
                    </div>
                    <div className="projects_modal__users table">
                        {users && users.length > 0 && <UserListForm users={users} selectedObj={selectedObj} />}
                        <Spinner areas={areas.userList} />
                    </div>
                    <div className="projects_modal__data_sets header">
                        Data Sets
                        </div>
                    <div className="projects_modal__data_sets table">
                        {dataSets && <DataSetsListForm dataSetsObj={dataSetsObj} />}
                        <Spinner areas={areas.dataSetList} />
                    </div>
                </div>
                <div className="projects_modal__project_name container">
                    <div className="projects_modal__project_name title">
                        Project Name
                        </div>
                    <div className="projects_modal__project_name input">
                        <input type="text"
                            onChange={e => setProjectName(e.target.value)}
                            value={projectName}
                            placeholder="Name this project..."
                        />
                    </div>
                </div>
                <div className="projects_modal__submit button">
                    <button
                        disabled={disabled}
                        onClick={handleSubmit}
                    >Create Project</button>
                </div>
            </div>

        </>
    )
}

export default NewProjectModal
