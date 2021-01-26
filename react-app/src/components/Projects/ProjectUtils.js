export const singleProjectPost = async (projectName, dataSetId, userId, targetHACount, targetSurvCount, setErrors) => {
    const post = await fetch("/api/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": projectName,
            "data_set_id": dataSetId,
            "user_id": userId,
            "target_health_area_count": targetHACount,
            "target_surv_count": targetSurvCount
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = await post.json()
    return project
}

export const multiProjectPost = async (projectName, dataSetId, user, targetHACount, targetSurvCount, setErrors) => {
    const post = await fetch("/api/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": `${projectName} (${user.first_name} ${user.last_name})`,
            "data_set_id": dataSetId,
            "user_id": user["id"],
            "target_health_area_count": targetHACount,
            "target_surv_count": targetSurvCount
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = await post.json()
    return project
}


export const singleProjectPostUpdate = async (projectName, dataSetId, userId, targetHACount, targetSurvCount, setErrors, selectedProjectId) => {
    const post = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": projectName,
            "data_set_id": dataSetId,
            "user_id": userId,
            "target_health_area_count": targetHACount,
            "target_surv_count": targetSurvCount
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = await post.json()
    return project
}

export const multiProjectPostUpdate = async (projectName, dataSetId, user, targetHACount, targetSurvCount, setErrors, selectedProjectId) => {
    const post = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "project_name": `${projectName} (${user.first_name} ${user.last_name})`,
            "data_set_id": dataSetId,
            "user_id": user["id"],
            "target_health_area_count": targetHACount,
            "target_surv_count": targetSurvCount
        })
    }).catch((res) => { if (res.data && res.data.errors) return setErrors(res.data.errors) })
    const project = await post.json()
    return project
}
