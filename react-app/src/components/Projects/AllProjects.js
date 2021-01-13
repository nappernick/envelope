import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import Project from './Project'
import Spinner from '../Loaders/Spinner';
import Modal from "react-modal"
import NewProjectModal from './NewProjectModal';

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '40%',
        left: '70%',
        right: '40%',
        bottom: 'auto',
        height: "45%",
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
    const user = useSelector(store => store.session.user)
    const [projects, setProjects] = useState([])
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const Row = ({ index, style }) => (
        <div
            key={`m_${index}`}
            className="project__card_container"
            style={style}
        >
            <Project user={user} project={projects[index]} />
        </div>
    )

    useEffect(() => {
        const projectsFetch = async () => {
            const pf = await fetch("/api/projects/")
            const p = await pf.json()
            setProjects(p)
        }
        trackPromise(projectsFetch(), areas.projects)

    }, [])
    return (
        <div className="projects__page container">
            <Spinner areas={areas.projects} />
            <List
                className="projects__list container"
                height={500}
                itemSize={50}
                width={500}
                itemCount={projects.length}
            >
                {projects.length && Row}

            </List>
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
                        contentLabel="New Project Upload Modal"
                    >
                        <NewProjectModal />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AllProjects
