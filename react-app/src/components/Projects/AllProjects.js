import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList as List } from 'react-window';
import { trackPromise } from "react-promise-tracker";
import { areas } from "../../common/areas";
import Project from './Project'
import Spinner from '../Spinner';

function AllProjects() {
    const user = useSelector(store => store.session.user)
    const [projects, setProjects] = useState([])

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
        <>
            <Spinner areas={areas.projects} />
            <List
                className="health_areas__container"
                height={500}
                itemSize={50}
                width={500}
                itemCount={projects.length}
            >
                {projects.length && Row}

            </List>
        </>
    )
}

export default AllProjects
