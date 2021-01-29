import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import ProjectCard from './ProjectCard/ProjectCard'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import _ from "lodash"
import AutoSizer from "react-virtualized-auto-sizer";
import { areas } from "../../common/areas";
import { usePromiseTracker } from 'react-promise-tracker';
import UpdateProjectModal from './ProjectModal/ProjectModal';
import { useInterval } from '../utils';
import { addProject } from '../../store/projects';
import "./Projects.css"

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
    const dispatch = useDispatch()
    const user = useSelector(store => store.session.user)
    const projects = useSelector(store => store.projects)
    const [viewSet, setViewSet] = useState('')
    const [showModal, setShowModal] = useState(false);
    // Created for inline use of promise state tracking & loader
    const { promiseInProgress } = usePromiseTracker({
        area: "delete-project",
        delay: 0,
    });


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    // The List package creates a number of items according to the itemCount field 
    // passed into the component - the Row is what each item will be constituted of
    // but we cannot pass in individual projects, so must use the index to access
    // the projects array from Redux store
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

    // Setting up & running polling
    useInterval(async () => {
        if (promiseInProgress) return
        console.log("Running check for projects...")
        let projectsFetch = await fetch("/api/projects/")
        if (projectsFetch.status === 200) projectsFetch = await projectsFetch.json()
        if (!projectsFetch.length) return
        if (_.isEqual(projectsFetch, projects)) return
        else {
            projectsFetch.forEach(proj => {
                let found = false
                for (let i = 0; i < projects.length; i++) {
                    if (projects[i].project_name === proj.project_name) return found = true
                }
                if (!found) dispatch(addProject(proj))
            })
        }
    }, 5000)

    // For CSS - set classes according to the number of projects, so the 
    // project cards are centered
    useEffect(() => {
        if (!projects) return
        else if (projects.length === 1) setViewSet("one")
        else if (projects.length === 2) setViewSet("two")
        else if (projects.length === 3) setViewSet("three")
    }, [projects])

    // Fetch project data when a user returns to the projects page, but not 
    // when the app is doing it's first load(already fetching then)
    useEffect(() => {
        const initialFetch = async () => {
            let projectsFetch = await fetch("/api/projects/")
            if (projectsFetch.status === 200) projectsFetch = await projectsFetch.json()
            if (!projectsFetch.length) return
            if (_.isEqual(projectsFetch, projects)) return
            else {
                projectsFetch.forEach(proj => {
                    let found = false
                    for (let i = 0; i < projects.length; i++) {
                        if (projects[i].project_name === proj.project_name) return found = true
                    }
                    if (!found) dispatch(addProject(proj))
                })
            }
        }
        if (projects.length) initialFetch()
    }, [])
    return (
        <div className="projects__page container">
            <div className="projects__header">
                <p>ALL PROJECTS</p>
            </div>
            <div className={`projects__scroll container ${viewSet}`} >
                {!projects.length ? <Spinner areas={areas.projects} /> :
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
