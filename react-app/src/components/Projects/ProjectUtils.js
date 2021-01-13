export const singleProjectPost = async (projectName, dataSetId, userId, setErrors) => {
    await fetch("/api/projects/", {
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
}

export const multiProjectPost = async (projectName, dataSetId, user, setErrors) => {
    await fetch("/api/projects/", {
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
}
