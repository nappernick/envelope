import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function AllProjects() {
    const user = useSelector(store => store.session.user)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const projectsFetch = async () => {
            const pf = await fetch("/api/projects/")
            const p = await pf.json()
            setProjects(p)
        }
        projectsFetch()

    }, [])
    console.log(projects)
    return (
        <div>
            {/* project component */}
        </div>
    )
}

export default AllProjects
