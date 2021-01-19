import React, { useEffect, useState } from 'react'
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { areas } from "../../../common/areas"
import { addProject } from '../../../store/projects';
import Spinner from '../../Loaders/Spinner';
import DataSetsListForm from '../ModalComponents/DataSetsListForm';
import { multiProjectPostUpdate, singleProjectPostUpdate } from '../ProjectUtils';
import UserListForm from '../ModalComponents/UserListForm';
import "./UpdateProject.css"

function UpdateProjectModal({ modalObj }) {
    const dispatch = useDispatch()
    const dataSets = useSelector(store => store.dataSets)
    const { project, closeUpdateProjectModal } = modalObj
    debugger
    const sessUser = useSelector(store => store.session.user)
    const [errors, setErrors] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([project.user])
    const [selectedDataSetId, setSelectedDataSetId] = useState(project.data_set)
    const [projectName, setProjectName] = useState(project.project_name)
    debugger
    console.log("PROJECT", project)
    console.log("PROJECT", project)
    const [disabled, setDisabled] = useState(true)
    const selectedObj = {
        "selectedUsers": selectedUsers,
        "setSelectedUsers": setSelectedUsers
    }
    const dataSetsObj = {
        "dataSets": dataSets,
        "setSelectedDataSetId": setSelectedDataSetId,
        "projectDataSetId": project.data_set.id
    }

    const handleSubmit = async (e) => {
        if (selectedUsers.length == 1) {
            let proj = await singleProjectPostUpdate(project.id, projectName, selectedDataSetId, selectedUsers[0]["id"], setErrors)
            dispatch(addProject(proj))
        }
        else {
            selectedUsers.forEach(async (user) => {
                let proj = await multiProjectPostUpdate(project.id, projectName, selectedDataSetId, user, setErrors)
                dispatch(addProject(proj))
            })

        }
        closeUpdateProjectModal()
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

    const handleNameChange = (e) => setProjectName(e.target.value)


    useEffect(() => {
        if (projectName && selectedUsers.length > 0 && selectedDataSetId) setDisabled(false)
        if (!projectName || selectedUsers.length == 0 || !selectedDataSetId) setDisabled(true)
    }, [projectName, selectedUsers, selectedDataSetId])

    return (
        <>
            <div className="update_project__modal container">
                <div className={"update_projects_modal__errors container"}>
                    {errors.map((error) => (
                        <div className={"projects_modal__errors error"}>{error}</div>
                    ))}
                </div>
                <div className={`update_project__header ${disabled ? "" : "complete"}`}>
                    <p>UPDATE PROJECT</p>
                </div>
                <hr />
                <div className="update_project_modal__users container">
                    <div className="update_project_modal__users header">
                        Update User
                    </div>
                    <div className="update_projects_modal__users table">
                        {users && users.length > 0 && <UserListForm users={users} selectedObj={selectedObj} />}
                        <Spinner areas={areas.userList} />
                    </div>
                </div>
                <div className="update_project_modal__data_sets container">
                    <div className="update_project_modal__data_sets header">
                        Update Data Set
                    </div>
                    <div className="update_projects_modal__data_sets table">
                        {dataSets && <DataSetsListForm dataSetsObj={dataSetsObj} />}
                        <Spinner areas={areas.dataSetList} />
                    </div>
                </div>
                <div className="update_project_modal__project_name container">
                    <div className="update_project_modal__project_name title">
                        Update Project Name
                    </div>
                    <div className="update_project_modal__project_name input">
                        <input
                            type="text"
                            className="update_project_modal"
                            onChange={handleNameChange}
                            value={projectName}
                        />
                    </div>
                </div>
                <div className="update_project_modal button">
                    <button
                        disabled={disabled}
                        onClick={handleSubmit}
                    >Create Project</button>
                </div>
            </div>
        </>
    )
}

export default UpdateProjectModal
