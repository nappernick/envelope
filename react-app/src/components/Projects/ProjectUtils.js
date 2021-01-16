export const singleProjectPost = async (projectName, dataSetId, userId, setErrors) => {
    const post = await fetch("/api/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": projectName,
            "data_set_id": dataSetId,
            "user_id": userId
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = post.json()
    return project
}

export const multiProjectPost = async (projectName, dataSetId, user, setErrors) => {
    const post = await fetch("/api/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": `${projectName} (${user.first_name} ${user.last_name})`,
            "data_set_id": dataSetId,
            "user_id": user["id"]
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = post.json()
    return project
}


export const singleProjectPostUpdate = async (selectedProjectId, projectName, dataSetId, userId, setErrors) => {
    const post = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": projectName,
            "data_set_id": dataSetId,
            "user_id": userId
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = post.json()
    return project
}

export const multiProjectPostUpdate = async (selectedProjectId, projectName, dataSetId, user, setErrors) => {
    const post = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": `${projectName} (${user.first_name} ${user.last_name})`,
            "data_set_id": dataSetId,
            "user_id": user["id"]
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = post.json()
    return project
}
