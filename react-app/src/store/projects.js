import { trackPromise } from "react-promise-tracker"
import { areas } from "../common/areas"

const SET_ALL_PROJECTS = 'project/setAlLProjects'
const SET_PROJECT = "project/setProject"
const REMOVE_PROJECT = 'project/removeProject'

const _setAllProjects = (projects) => {
    return {
        type: SET_ALL_PROJECTS,
        projects
    }
}

const _setProject = (project) => {
    return {
        type: SET_PROJECT,
        project
    }
}

const _removeProject = (id) => {
    return {
        type: REMOVE_PROJECT,
        id
    }
}

export const addProject = (project) => async (dispatch) => {
    dispatch(_setProject(project))
    return
}

export const removeProject = (id) => async (dispatch) => {
    dispatch(_removeProject(id))
    return
}

export const setAllProjects = () => async (dispatch) => {
    const fetchAndDispatchProjects = async () => {
        const projectsFectch = await fetch("/api/projects/")
        const projects = await projectsFectch.json()
        if (projects.length) dispatch(_setAllProjects(projects))
        return
    }
    trackPromise(fetchAndDispatchProjects(), areas.projects)
}


const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS:
            return [...action.projects]
        case SET_PROJECT:
            let filteredProjecs = state.filter(el => {
                return el.id !== action.project.id
            });
            filteredProjecs.push(action.project)
            if (state.length <= filteredProjecs.length) {
                return [
                    ...filteredProjecs
                ];
            }
            return state
        case REMOVE_PROJECT:
            let removedProject = state.filter((el) => {
                return el.id !== action.id
            });
            if (state.length > removedProject.length) return [...removedProject]
            return state
        default:
            return state
    }

}

export default projectsReducer;
