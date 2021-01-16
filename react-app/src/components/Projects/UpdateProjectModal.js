import React, { useEffect, useState } from 'react'
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import { areas } from "../../common/areas"
import Spinner from '../Loaders/Spinner';
import DataSetsListForm from './DataSetsListForm';
import UserListForm from './UserListForm';

function UpdateProjectModal({ modalObj }) {
    const dataSets = useSelector(store => store.dataSets)
    const { project, setProject, handleUpdateProject, closeUpdateProjectModal } = modalObj
    const sessUser = useSelector(store => store.session.user)
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([project.user])
    const [selectedDataSetId, setSelectedDataSetId] = useState(project.data_set)
    const [projectName, setProjectName] = useState(project.project_name)
    const selectedObj = {
        "selectedUsers": selectedUsers,
        "setSelectedUsers": setSelectedUsers
    }
    const dataSetsObj = {
        "dataSets": dataSets,
        "setSelectedDataSetId": setSelectedDataSetId
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

    return (
        <>
            <div className="update_project__modal container">
                <div className="update_project__modal header">
                    Update Project
                </div>
                <div className="update_project__modal update_name">
                    <div className="update_project__modal sub_header">
                        Update Project Name:
                    </div>
                    <div className="update_project__modal input">
                        <input
                            type="text"
                            className="update_project__modal"
                            onChange={handleNameChange}
                            value={projectName}
                        />
                    </div>
                </div>
                <hr />
                <div className="update_project_modal__users">
                    <div className="update_project_modal__users sub_header">
                        Update User:
                    </div>
                    <div className="update_projects_modal__users table">
                        {users && users.length > 0 && <UserListForm users={users} selectedObj={selectedObj} />}
                        <Spinner areas={areas.userList} />
                    </div>
                </div>
                <hr />
                <div className="update_project_modal__data_sets">
                    <div className="update_project_modal__data_sets sub_header">
                        Update Data Set:
                    </div>
                    <div className="update_projects_modal__data_sets table">
                        {dataSets && <DataSetsListForm dataSetsObj={dataSetsObj} />}
                        <Spinner areas={areas.dataSetList} />
                    </div>
                </div>
                <div className="update_project__modal submit">
                    {/* <button onClick={handleSubmit} >Submit</button> */}
                </div>
            </div>
        </>
    )
}

export default UpdateProjectModal
