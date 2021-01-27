import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import Modal from "react-modal"
import NumberFormat from "react-number-format";
import ProjectModal from '../ProjectModal/ProjectModal';
import { useDispatch, useSelector } from 'react-redux';
import { removeProject } from '../../../store/projects';
import { decimalToMinSec } from "../../utils"
import SmallThreeBounce from "../../Loaders/SmallThreeBounce"
import "./ProjectCard.css"
import { areas } from '../../../common/areas';
import { trackPromise } from 'react-promise-tracker';

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: 'auto',
        right: '23%',
        bottom: 'auto',
        height: "90%",
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

function ProjectCard({ project }) {
    const user = useSelector(store => store.session.user)
    const dataSets = useSelector(store => store.dataSets)
    const dispatch = useDispatch()
    const [projectDataSet, setProjectDataSet] = useState(null)
    const [proj, setProj] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()

    const closeModal = () => setShowModal(false)

    // Deleting projects
    const onSelect = ({ key }) => {
        if (key === "1") {
            dispatch(removeProject(project.id))
            trackPromise(fetch(`/api/projects/${project.id}`, { method: "DELETE" }), areas.deleteProject)
        }
    }

    // Menu dropdown for deletion
    const menuCallback = () => (
        <Menu
            onClick={onSelect}
            selectable={false}
        >
            <MenuItem
                style={{ cursor: "pointer" }}
                key="1"
            >Delete Project</MenuItem>
        </Menu>
    );

    // Set the appropriate dataset for project to local state
    useEffect(() => {
        if (!project) return
        else dataSets.forEach(dataSet => {
            if (dataSet.id === project.data_set_id) setProjectDataSet(dataSet)
        })
    }, [project, dataSets])

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
        setProj(project)
        setShowModal(true)
    }

    return (
        <div className="project_card__container" >
            {user.type_id === 1 ? <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
            >
                <div className="project_card__heading">
                    <p>
                        {project && project.project_name}
                    </p>
                </div>
            </Dropdown> : <div className="project_card__heading">
                    <p>
                        {project && project.project_name}
                    </p>
                </div>}
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
                        {projectDataSet ?
                            projectDataSet.data_set_name
                            :
                            <SmallThreeBounce
                                areas={areas.dataSetList}
                            />
                        }

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
                <div className="project_card__survey_coverages container">
                    <div className="project_card__survey_coverages title">
                        Avg Survey Coverage:
                    </div>
                    <div className="project_card__survey_coverages count">
                        {project &&
                            <NumberFormat
                                value={project.survey_coverage * 100}
                                displayType={"text"}
                                decimalScale={0}
                                suffix={"%"}
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
                <div className="project_card__health_area_coverage container">
                    <div className="project_card__health_area_coverage title">
                        Health Area Coverage:
                    </div>
                    <div className="project_card__health_area_coverage count">
                        {project &&
                            <NumberFormat
                                value={project.health_area_coverage * 100}
                                displayType={"text"}
                                decimalScale={0}
                                suffix={"%"}
                                renderText={(value) => <div>{value}</div>}
                            />}
                    </div>
                </div>
                <div className="project_card__duration_avg container">
                    <div className="project_card__duration_avg title">
                        Average Duration:
                    </div>
                    <div className="project_card__duration_avg count">
                        {project && decimalToMinSec(project.avg_duration)}
                    </div>
                </div>
            </div>
            <div className="project_card__map_stats_btns outermost">
                <div className="project_card__map button">
                    <button onClick={handleMapClick}>Map</button>
                </div>
                {user.type_id === 1 && <div className="project_card__edit button">
                    <button onClick={handleEditClick}>Edit</button>
                </div>}
                <div className="project_card__stats button">
                    <button onClick={handleStatsClick}>Stats</button>
                </div>
            </div>
            <div className="project_card__update modal">
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    closeTimeoutMS={300}
                    contentLabel="Update Project Modal"
                >
                    <ProjectModal project={proj} closeModal={closeModal} />
                </Modal>
            </div>
        </div>
    )
}

export default ProjectCard
