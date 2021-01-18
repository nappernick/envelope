import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { areas } from "../../common/areas";
import ProjectCard from './ProjectCard/ProjectCard'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import NewProjectModal from './NewProjectModal/NewProjectModal';
import AutoSizer from "react-virtualized-auto-sizer";
import "./Projects.css"
import { usePromiseTracker } from 'react-promise-tracker';

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
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
    }
};
// rgba(17, 12, 46, 0.15) 0px 48px 100px 0px
// box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px

function AllProjects() {
    const user = useSelector(store => store.session.user)
    const projects = useSelector(store => store.projects)
    const [area, setArea] = useState('')
    const [project, setProject] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const { promiseInProgress } = usePromiseTracker({
        area: area,
        delay: 0,
    });


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const modalObj = {
        "project": project,
        "setProject": setProject,
        "closeUpdateProjectModal": closeModal,

    }

    const Row = ({ index, style, data }) => {
        let { project, setProject } = data
        const projectObj = {
            "stateProject": project,
            "setStateProject": setProject,
            "project": projects[index],
            "user": user,
            "area": area,
            "setArea": setArea,
            "index": index,
            "showUpdateModal": showUpdateModal,
            "setShowUpdateModal": setShowUpdateModal,
        }
        return (
            <div
                key={`m_${index}`}
                className="project__card_container"
                style={style}
            >
                {promiseInProgress ? <Spinner areas={area} /> : <ProjectCard projectObj={projectObj} />}
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
                        <NewProjectModal
                            closeModal={closeModal}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AllProjects
