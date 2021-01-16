import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import { setAllProjects } from "../../store/projects"
import ProjectCard from './ProjectCard'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import NewProjectModal from './NewProjectModal';
import AutoSizer from "react-virtualized-auto-sizer";
import "./Projects.css"

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

function AllProjects() {
    const dispatch = useDispatch()
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
            <div className="projects__scroll container" >
                <Spinner areas={areas.projects} />
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="projects__list container"
                            height={height}
                            itemSize={320}
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
