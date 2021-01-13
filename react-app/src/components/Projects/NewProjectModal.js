import React, { useEffect, useState } from 'react'
import Spinner from "../Loaders/Spinner"
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import UserListForm from './UserListForm';
import { useSelector } from 'react-redux';
import DataSetsListForm from './DataSetsListForm';

function NewProjectModal() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [dataSets, setDataSets] = useState([]);
    const [selectedDataSetId, setSelectedDataSetId] = useState(null)
    const sessUser = useSelector(store => store.session.user)
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
        trackPromise(fetchUsers(), areas.userList);
        const fetchDataSets = async () => {
            const response = await fetch("/api/data/data-sets")
            const responseData = await response.json()
            // if (!responseData["errors"]) setDataSets(responseData)
            setDataSets(responseData)
        }
        trackPromise(fetchDataSets(), areas.dataSetList)
    }, []);

    console.log(dataSets)

    return (
        <>
            <div className="projects_modal__container">
                <div className="projects_modal__user container">
                    <div className="projects_modal__users header">
                        Users
                    </div>
                    <div className="projects_modal__users table">
                        <Spinner areas={areas.userList} />
                        {users && users.length > 0 && <UserListForm users={users} selectedObj={selectedObj} />}
                    </div>
                    <hr />
                    <div className="projects_modal__data_sets table">
                        <Spinner areas={areas.dataSetList} />
                        {dataSets && <DataSetsListForm dataSetsObj={dataSetsObj} />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewProjectModal
