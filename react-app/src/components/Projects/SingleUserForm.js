import React, { useEffect, useState } from 'react'
import Switch from "react-switch";

function SingleUserForm({ user, selectedObj }) {
    const { selectedUsers, setSelectedUsers } = selectedObj
    const [switched, setSwitched] = useState(false)

    const handleSwitch = () => {
        setSwitched(!switched)
        let newSelected = [...selectedUsers]
        if (switched === false) {
            let i = newSelected.indexOf(user)
            if (i === -1) newSelected.push(user)
        }
        else {
            newSelected = newSelected.filter(el => el.id !== user.id)
        }
        setSelectedUsers(newSelected)
    }

    useEffect(() => {
        if (!selectedUsers.length || !user) return
        if (selectedUsers[0].id === user.id) setSwitched(!switched)
    }, [])

    console.log(selectedUsers)

    return (
        <>
            <tr className="projects_modal__user_list row">
                <td className="projects_modal__user_list row">
                    {user.username}
                </td>
                <td className="projects_modal__user_list row">
                    {user.first_name}
                </td>
                <td className="projects_modal__user_list row">
                    {user.last_name}
                </td>
                <td className="projects_modal__user_list row">
                    {user.email}
                </td>
                <td className="projects_modal__user_list row">
                    {user.type}
                </td>
                <td className="projects_modal__user_list row">
                    <Switch onChange={handleSwitch} checked={switched} />
                    {/* <input type="checkbox" /> */}
                </td>
            </tr>
        </>
    )
}

export default SingleUserForm
