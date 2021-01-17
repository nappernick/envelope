import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { areas } from "../../common/areas";
import ProjectCard from './ProjectCard'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import NewProjectModal from './NewProjectModal';
import AutoSizer from "react-virtualized-auto-sizer";
import "./Projects.css"

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '45%',
        left: 'auto',
        right: '30%',
        bottom: 'auto',
        height: "65%",
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

function AllProjects() {
    const user = useSelector(store => store.session.user)
    const projects = useSelector(store => store.projects)
    const [project, setProject] = useState({})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const Row = ({ index, style, data }) => {
        let { project, setProject } = data
        const projectObj = {
            "stateProject": project,
            "setStateProject": setProject,
            "project": projects[index],
            "user": user,
        }
        return (
            <div
                key={`m_${index}`}
                className="project__card_container"
                style={style}
            >
                <ProjectCard projectObj={projectObj} />
            </div>
        )
    }
    return (
        <div className="projects__page container">
            <div className="projects__header">
                <p>ALL PROJECTS</p>
            </div>
            <div className="projects__scroll container" >
                <Spinner areas={areas.projects} />
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="projects__list container"
                            height={height}
                            itemSize={370}
                            width={width}
                            itemCount={projects ? projects.length : 0}
                            itemData={{
                                "project": project,
                                "setProject": setProject
                            }}
                            layout="horizontal"
                        >
                            {projects.length && Row}

                        </List>
                    )}
                </AutoSizer>
            </div>
            <div className="projects__new_project container">
                <div className="projects__new_project button">
                    <button onClick={openModal} className="projects__new_project">
                        New Project
                    </button>
                </div>
                <div className="projects__new_project modal">
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        closeTimeoutMS={300}
                        contentLabel="New Project Upload Modal"
                    >
                        <NewProjectModal closeModal={closeModal} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AllProjects
