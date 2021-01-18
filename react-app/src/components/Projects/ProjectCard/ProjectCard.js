import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import Modal from "react-modal"
import NumberFormat from "react-number-format";
import UpdateProjectModal from '../UpdateProjectModal/UpdateProjectModal';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../../store/projects';
import "./ProjectCard.css"

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: 'auto',
        right: '23%',
        bottom: 'auto',
        height: "80%",
        marginRight: '-50%',
        paddingTop: "30px",
        paddingLeft: "60px",
        paddingRight: "60px",
        transform: 'translate(-100%, -50%)',
        border: 'none',
        borderRadius: '10px',
        display: "flex",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
    }
};

function ProjectCard({ projectObj }) {
    const dispatch = useDispatch()
    const { project, user, stateProject, setStateProject, showUpdateModal, setShowUpdateModal } = projectObj
    const history = useHistory()


    const onSelect = ({ key }) => {
        if (key === "2") {
            console.log(stateProject)
            console.log(project)
            // dispatch(removeProject(project.id))
            // fetch(`/api/projects/${project.id}`, { method: "DELETE" })
        }
    }

    const closeUpdateProjectModal = () => setShowUpdateModal(false)
    const openUpdateProjectModal = () => setShowUpdateModal(true)
    // const handleMouseEnter = () => {
    //     setStateProject(project)
    // }

    const menuCallback = () => (
        <Menu
            onClick={onSelect}
            selectable={false}
        >
            {/* <MenuItem style={{ cursor: "pointer" }} key="3">Open Project</MenuItem>
            <Divider /> */}
            <MenuItem
                style={{ cursor: "pointer" }}
                key="2"
                onMouseEnter={handleMouseEnter}
            >Delete Project</MenuItem>
        </Menu>
    );

    const modalObj = {
        "project": project,
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

    const handleEditClick = (e) => {
        e.preventDefault()
        console.log(project)
        setStateProject(project)
        openUpdateProjectModal()
    }

    useEffect(() => {
        setStateProject(project)
    }, [showUpdateModal])

    return (
        <div className="project_card__container" >
            <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
            >
                <div className="project_card__heading">
                    <p>
                        {project && project.project_name}
                    </p>
                </div>
            </Dropdown>
            <div className="project_card__info outermost">
                <div className="project_card__info header">
                    Project Info
                </div>
                {user.type_id === 1 && <div className="project_card__owner container">
                    <div className="project_card__owner title">
                        Project Owner:
                    </div>
                    <div className="project_card__owner name">
                        {project.user && project.user.first_name} {project.user && project.user.last_name}
                    </div>
                </div>}
                <div className="project_card__data_set container">
                    <div className="project_card__data_set title">
                        Data Set:
                    </div>
                    <div className="project_card__data_set name">
                        {project.data_set && project.data_set.data_set_name}

                    </div>
                </div>
            </div>
            <div className="project_card__stats outermost">
                <div className="project_stats header">
                    Project Stats
                </div>
                <div className="project_card__enumerators container">
                    <div className="project_card__enumerators title">
                        Enumerator Count:
                    </div>
                    <div className="project_card__enumerators count">
                        {project &&
                            <NumberFormat
                                value={project.enumerator_count}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
                <div className="project_card__surveys container">
                    <div className="project_card__surveys title">
                        Surveys Count:
                    </div>
                    <div className="project_card__surveys count">
                        {project &&
                            <NumberFormat
                                value={project.survey_count}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
                <div className="project_card__health_areas container">
                    <div className="project_card__health_areas title">
                        Health Area Count:
                    </div>
                    <div className="project_card__health_areas count">
                        {project &&
                            <NumberFormat
                                value={project.health_area_count}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
                <div className="project_card__duration_avg container">
                    <div className="project_card__duration_avg title">
                        Average Duration:
                    </div>
                    <div className="project_card__duration_avg count">
                        {project && Math.round(project.avg_duration)}
                    </div>
                </div>
                <div className="project_card__outliers container">
                    <div className="project_card__outliers title">
                        Outlier Data Points:
                    </div>
                    <div className="project_card__outliers count">
                        {project &&
                            <NumberFormat
                                value={project.outlier_count}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
                <div className="project_card__dont_knows container">
                    <div className="project_card__dont_knows title">
                        Don't Know Responses:
                    </div>
                    <div className="project_card__dont_knows count">
                        {project &&
                            <NumberFormat
                                value={project.dont_know_count}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
            </div>
            <div className="project_card__map_stats_btns outermost">
                <div className="project_card__map button">
                    <button onClick={handleMapClick}>Map</button>
                </div>
                <div className="project_card__edit button">
                    <button onClick={openUpdateProjectModal}>Edit</button>
                </div>
                <div className="project_card__stats button">
                    <button onClick={handleStatsClick}>Stats</button>
                </div>
            </div>
            <div className="project_card__update modal">
                <Modal
                    isOpen={showUpdateModal}
                    onRequestClose={closeUpdateProjectModal}
                    style={customStyles}
                    closeTimeoutMS={300}
                    contentLabel="Update Project Modal"
                >
                    <UpdateProjectModal modalObj={modalObj} />
                </Modal>
            </div>
        </div>
    )
}

export default ProjectCard
