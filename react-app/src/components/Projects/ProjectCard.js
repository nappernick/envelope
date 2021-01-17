import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import Modal from "react-modal"
import NumberFormat from "react-number-format";
import UpdateProjectModal from './UpdateProjectModal';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../store/projects';
import "./ProjectCard.css"

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '45%',
        left: 'auto',
        right: '30%',
        bottom: 'auto',
        height: "75%",
        marginRight: '-50%',
        paddingTop: "30px",
        paddingLeft: "60px",
        paddingRight: "60px",
        transform: 'translate(-100%, -50%)',
        border: '1px solid lightgrey',
        display: "flex",
        justifyContent: "center",
    }
};

function ProjectCard({ projectObj }) {
    const dispatch = useDispatch()
    const { project, user, stateProject, setStateProject } = projectObj
    const [showModal, setShowModal] = useState(false);
    const history = useHistory()


    const onSelect = ({ key }) => {
        // console.log(key === "1")
        if (key === "1") {
            // console.log("HERE AFTER CLICK")
            setStateProject(project)
            setShowModal(true)
            setShowModal(true)
        }
        if (key === "2") {
            fetch(`/api/projects/${project.id}`, { method: "DELETE" })
            dispatch(removeProject(project.id))
        }
    }
    // console.log("MODAL STATE", showModal)

    const closeUpdateProjectModal = () => setShowModal(false)

    const menuCallback = () => (
        <Menu
            // onSelect={onSelect}
            onClick={onSelect}
            selectable={false}
        >
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
                <div className="project_card__stats button">
                    <button onClick={handleStatsClick}>Stats</button>
                </div>
            </div>
            <div className="project_card__update modal">
                {/* {console.log("IN LINES OF CODE MODAL", showModal)} */}
                <Modal
                    isOpen={showModal}
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
