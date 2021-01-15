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

const removeProject = (project) => {
    return {
        type: REMOVE_PROJECT
    }
}


export const setAllProjects = () => async (dispatch) => {
    const projectsFectch = await fetch("/api/projects/")
    const projects = await projectsFectch.json()
    if (projects.length) dispatch(_setAllProjects(projects))
    // if (projects.length) projects.forEach(project => dispatch(_setProject(project)))
}


const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS:
            return [...action.projects]
        case SET_PROJECT:
            let setIndex = state.findIndex(el => Object.values(el) === Object.values(action.project));
            if (setIndex === -1) {
                return [...state, action.project];
            }
            return state
        case REMOVE_PROJECT:
            let unsetIndex = state.findIndex(el => Object.values(el) === Object.values(action.project));
            if (unsetIndex !== -1) {
                return [
                    ...state.slice(0, unsetIndex),
                    ...state.slice(unsetIndex + 1)
                ]
            }
            return state
        default:
            return state
    }

}

export default projectsReducer;
