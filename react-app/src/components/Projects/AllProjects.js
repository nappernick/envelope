import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { areas } from "../../common/areas";
import ProjectCard from './ProjectCard/ProjectCard'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import AutoSizer from "react-virtualized-auto-sizer";
import "./Projects.css"
import { usePromiseTracker } from 'react-promise-tracker';
import UpdateProjectModal from './ProjectModal/ProjectModal';

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
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
    }
};
// rgba(17, 12, 46, 0.15) 0px 48px 100px 0px
// box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px

function AllProjects() {
    const user = useSelector(store => store.session.user)
    const projects = useSelector(store => store.projects)
    const [viewSet, setViewSet] = useState('')
    const [showModal, setShowModal] = useState(false);
    const { promiseInProgress } = usePromiseTracker({
        area: "projects-area",
        delay: 0,
    });


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const Row = ({ index, style, data }) => {
        let { projects } = data
        return (
            <div
                key={`m_${index}`}
                className="project__card_container"
                style={style}
            >
                <ProjectCard project={projects[index]} />
            </div>
        )
    }

    useEffect(() => {
        if (!projects) return
        else if (projects.length == 1) setViewSet("one")
        else if (projects.length == 2) setViewSet("two")
        else if (projects.length == 3) setViewSet("three")
    }, [projects])
    return (
        <div className="projects__page container">
            <div className="projects__header">
                <p>ALL PROJECTS</p>
            </div>
            <div className={`projects__scroll container ${viewSet}`} >
                {promiseInProgress ? <Spinner areas={areas.projects} /> :
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className="projects__list container"
                                height={height}
                                itemSize={370}
                                width={width}
                                itemCount={projects ? projects.length : 0}
                                itemData={{
                                    "projects": projects
                                }}
                                layout="horizontal"
                            >
                                {projects.length && Row}

                            </List>
                        )}
                    </AutoSizer>
                }
            </div>
            <div className="projects__new_project container">
                {user.type_id === 1 && <div className="projects__new_project button">
                    <button onClick={openModal} className="projects__new_project">
                        New Project
                    </button>
                </div>}
                <div className="projects__new_project modal">
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        closeTimeoutMS={300}
                        contentLabel="New Project Upload Modal"
                    >
                        <UpdateProjectModal
                            closeModal={closeModal}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AllProjects
