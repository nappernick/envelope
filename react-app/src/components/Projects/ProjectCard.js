import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import Modal from "react-modal"
import UpdateProjectModal from './UpdateProjectModal';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../store/projects';

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '40%',
        left: '70%',
        right: '40%',
        bottom: 'auto',
        height: "65%",
        marginRight: '-50%',
        paddingTop: "0px",
        transform: 'translate(-100%, -50%)',
        border: '1px solid lightgrey',
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
    }
};

function ProjectCard({ projectObj }) {
    const dispatch = useDispatch()
    const { project, user, stateProject, setStateProject } = projectObj
    const [showModal, setShowModal] = useState(false);
    const history = useHistory()


    const onSelect = async ({ key }) => {
        console.log(key === "1")
        if (key === "1") {
            setShowModal(true)
            setStateProject(project)
        }
        if (key === "2") {
            const post = await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
            dispatch(removeProject(project.id))
        }
    }

    const openModal = async (project) => {
        console.log()
        setShowModal(true)
        setStateProject(project)
    }
    const closeUpdateProjectModal = () => setShowModal(false)

    const menuCallback = () => (
        <Menu onClick={onSelect}>
            <MenuItem style={{ cursor: "pointer" }} key="3">Open Project</MenuItem>
            <Divider />
            <MenuItem style={{ cursor: "pointer" }} key="1">Edit Project</MenuItem>
            <Divider />
            <MenuItem style={{ cursor: "pointer" }} key="2">Delete Project</MenuItem>
        </Menu>
    );

    const modalObj = {
        "project": stateProject,
        "setProject": setStateProject,
        "closeUpdateProjectModal": closeUpdateProjectModal
    }

    const handleMapClick = (e) => {
        e.preventDefault()
        return history.push(`/users/${user.id}/projects/${project.id}/map`)
    }

    const handleStatsClick = (e) => {
        e.preventDefault()
        return history.push(`/users/${user.id}/projects/${project.id}/stats`)
    }
    return (
        <>
            <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
            >
                <div className="project__card_heading">
                    {project && project.project_name}
                </div>
            </Dropdown>
            <div className="project__info">
                <div className="project__info header">
                    Project Info
                </div>
                {user.type_id === 1 && <div className="project__owner container">
                    <div className="project__owner title">
                        Project Owner:
                    </div>
                    <div className="project__owner name">
                        {project.user && project.user.first_name} {project.user && project.user.last_name}
                    </div>
                </div>}
                <div className="project__data_set container">
                    <div className="project__data_set title">
                        Data Set:
                    </div>
                    <div className="project__data_set name">
                        {project.data_set && project.data_set.data_set_name}
                    </div>
                </div>
            </div>
            <div className="project__stats">
                <div className="project_stats header">
                    Project Stats
                </div>
                <div className="project__enumerators container">
                    <div className="project__enumerators title">
                        Enumerator Count:
                    </div>
                    <div className="project__enumerators count">
                        {project && project.enumerator_count}
                    </div>
                </div>
                <div className="project__surveys container">
                    <div className="project__surveys title">
                        Surveys Count:
                    </div>
                    <div className="project__surveys count">
                        {project && project.survey_count}
                    </div>
                </div>
                <div className="project__health_areas container">
                    <div className="project__health_areas title">
                        Health Area Count:
                    </div>
                    <div className="project__health_areas count">
                        {project && project.health_area_count}
                    </div>
                </div>
                <div className="project__duration_avg container">
                    <div className="project__duration_avg title">
                        Average Survey Duration:
                    </div>
                    <div className="project__duration_avg count">
                        {project && project.avg_duration}
                    </div>
                </div>
                <div className="project__outliers container">
                    <div className="project__outliers title">
                        Outlier Data Points:
                    </div>
                    <div className="project__outliers count">
                        {project && project.outlier_count}
                    </div>
                </div>
                <div className="project__dont_knows container">
                    <div className="project__dont_knows title">
                        Don't Know Responses:
                    </div>
                    <div className="project__dont_knows count">
                        {project && project.dont_know_count}
                    </div>
                </div>
            </div>
            <div className="project__map_stats_btns">
                <div className="project__map button">
                    <button onClick={handleMapClick}>Map</button>
                </div>
                <div className="project__stats button">
                    <button onClick={handleStatsClick}>Stats</button>
                </div>
            </div>
            <div className="project__update modal">
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeUpdateProjectModal}
                    style={customStyles}
                    contentLabel="Update Project Modal"
                >
                    <UpdateProjectModal modalObj={modalObj} />
                </Modal>
            </div>
        </>
    )
}

export default ProjectCard
