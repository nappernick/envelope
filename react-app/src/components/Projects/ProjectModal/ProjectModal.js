import React, { useEffect, useState } from 'react'
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { areas } from "../../../common/areas"
import { addProject, removeProject } from '../../../store/projects';
import Spinner from '../../Loaders/Spinner';
import DataSetsListForm from '../ModalComponents/DataSetsListForm';
import { multiProjectPost, multiProjectPostUpdate, singleProjectPost, singleProjectPostUpdate } from '../ProjectUtils';
import UserListForm from '../ModalComponents/UserListForm';
import "./ProjectModal.css"

function ProjectModal({ project, closeModal }) {
    const dispatch = useDispatch()
    const dataSets = useSelector(store => store.dataSets)
    const sessUser = useSelector(store => store.session.user)
    const projects = useSelector(store => store.projects)
    const [errors, setErrors] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(project ? [project.user] : [])
    const [projectDataSet, setProjectDataSet] = useState(null)
    const [selectedDataSetId, setSelectedDataSetId] = useState(projectDataSet ? projectDataSet : null)
    // Fields for project details
    const [projectName, setProjectName] = useState(project ? project.project_name : "")
    const [targetHACount, setTargetHACount] = useState(project ? project.target_health_area_count : "")
    const [targetSurvCount, setTargetSurvCount] = useState(project ? project.target_surv_count : "")
    // Local state for checking duplicate project names / data completeness
    const [disabled, setDisabled] = useState(true)
    const [projectNames, setProjectNames] = useState([])
    const [dupeName, setDupeName] = useState(false)
    // Objects for efficiently passing data to components
    const selectedObj = {
        "selectedUsers": selectedUsers,
        "setSelectedUsers": setSelectedUsers
    }
    const dataSetsObj = {
        "dataSets": dataSets,
        "setSelectedDataSetId": setSelectedDataSetId,
        "projectDataSetId": project ? project.data_set_id : ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);
        // If there is a project, this is an update modal
        if (project) {
            if (selectedUsers.length === 1) {
                // Since project update is so quick, we don't implement polling
                closeModal()
                dispatch(removeProject(project.id))
                let proj = await singleProjectPostUpdate(projectName, selectedDataSetId, selectedUsers[0]["id"], targetHACount, targetSurvCount, setErrors, project.id)
                dispatch(addProject(proj))
            }
            else selectedUsers.forEach(async (user) => {
                closeModal()
                dispatch(removeProject(project.id))
                let proj = await multiProjectPostUpdate(projectName, selectedDataSetId, user, targetHACount, targetSurvCount, setErrors, project.id)
                dispatch(addProject(proj))
            })
        }
        // If there is no project, this is a new project modal
        else {
            if (selectedUsers.length === 1) {
                closeModal()
                // Polling approach: because new projects are so expensive to create, we don't await the post & dispatch
                // The dispatch is on AllProjects inside of a useInterval
                singleProjectPost(projectName, selectedDataSetId, selectedUsers[0]["id"], targetHACount, targetSurvCount, setErrors)
            }
            else selectedUsers.forEach(async (user) => {
                closeModal()
                multiProjectPost(projectName, selectedDataSetId, user, targetHACount, targetSurvCount, setErrors)
            })
            closeModal()
        }
    }


    // Track input data in local state
    const handleNameChange = (e) => setProjectName(e.target.value)
    const handleTargetHAChange = (e) => setTargetHACount(e.target.value)
    const handleTargetSurvChange = (e) => setTargetSurvCount(e.target.value)

    // Fetch data on page load
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`/api/users/${sessUser.id}/clients`);
            const responseData = await response.json();
            setUsers(responseData);
        }
        trackPromise(fetchUsers(), areas.userList)
        // Once projects are loaded build list of project names for duplicate check
        if (projects) {
            const newProjectNames = []
            projects.forEach(project => {
                if (projectName !== project.project_name) newProjectNames.push(project.project_name)
            })
            setProjectNames(newProjectNames)
        }
        if (project) dataSets.forEach(dataSet => {
            if (dataSet.id === project.data_set_id) setProjectDataSet(dataSet)
        })
    }, []);

    // For tracking if the project name is already taken
    useEffect(() => {
        if (projectNames.indexOf(projectName) > -1) {
            setDupeName(true)
        }
        else {
            setDupeName(false)
        }
    }, [projectName])

    // For keeping the disabled state of the button accurate to current inputs
    useEffect(() => {
        if (projectName && selectedUsers.length > 0 && selectedDataSetId && targetHACount && targetSurvCount) setDisabled(false)
        if (!projectName || selectedUsers.length === 0 || !selectedDataSetId || targetHACount === "" || !targetHACount || targetSurvCount === "" || !targetSurvCount) setDisabled(true)
    }, [projectName, selectedUsers, selectedDataSetId, targetHACount, targetSurvCount])

    return (
        <>
            <div className="update_project__modal container">
                <div className={"update_projects_modal__errors container"}>
                    {errors.map((error) => (
                        <div className={"projects_modal__errors error"}>{error}</div>
                    ))}
                </div>
                <div className={`update_project__header ${disabled ? "" : "complete"}`}>
                    {project ? <p>UPDATE PROJECT</p> : <p>NEW PROJECT</p>}
                </div>
                <hr />
                <div className="update_project_modal__users container">
                    <div className="update_project_modal__users header">
                        {project ? "Update Users" : "Users"}
                    </div>
                    <div className="update_projects_modal__users table">
                        {users ? users.length > 0 && <UserListForm users={users} selectedObj={selectedObj} /> :
                            <Spinner areas={areas.userList} />}
                    </div>
                </div>
                <div className="update_project_modal__data_sets container">
                    <div className="update_project_modal__data_sets header">
                        {project ? "Update Data Set" : "Data Set"}
                    </div>
                    <div className="update_projects_modal__data_sets table">
                        {dataSets ? <DataSetsListForm dataSetsObj={dataSetsObj} /> :
                            <Spinner areas={areas.dataSetList} />}
                    </div>
                </div>
                <div className="update_project_modal__project_name input-container">
                    <div className="update_project_modal__project_name title">
                        {project ? "Update Project Name" : "Project Name"}
                    </div>
                    <div className="update_project_modal__project_name input">
                        <input
                            type="text"
                            className="update_project_modal"
                            onChange={handleNameChange}
                            value={projectName}
                            placeholder="Project name..."
                        />
                    </div>
                </div>
                <div className="update_project_modal__target_ha_count input-container small">
                    <div className="update_project_modal__target_ha_count title">
                        {project ? "Update Target Health Area Count" : "Target Number of Health Areas"}
                    </div>
                    <div className="update_project_modal__target_ha_count input">
                        <input
                            type="number"
                            className="update_project_modal"
                            onChange={handleTargetHAChange}
                            value={targetHACount}
                            placeholder="178"
                        />
                    </div>
                </div>
                <div className="update_project_modal__target_survey_count input-container small">
                    <div className="update_project_modal__target_survey_count title">
                        {project ? "Update Target Surveys Per Health Area" : "Target Surveys Per Health Area"}
                    </div>
                    <div className="update_project_modal__target_survey_count input">
                        <input
                            type="number"
                            className="update_project_modal"
                            onChange={handleTargetSurvChange}
                            value={targetSurvCount}
                            placeholder="24"
                        />
                    </div>
                </div>
                <div className="update_project_modal button">
                    <button
                        disabled={disabled}
                        onClick={handleSubmit}
                        className={dupeName ? "dupe" : ""}
                    >{dupeName ? "Name Taken" : project ? "Update Project" : "Create Project"}</button>
                </div>
            </div>
        </>
    )
}

export default ProjectModal
