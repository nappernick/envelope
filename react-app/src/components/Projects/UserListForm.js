import React from 'react'
import SingleUserForm from './SingleUserForm'

function UserListForm({ users, selectedObj }) {
    return (
        <>
            <table className="projects_modal__user_list list">
                <thead>
                    <tr className="projects_modal__user_list header">
                        <th className="projects_modal__user_list header">
                            First Name</th>
                        <th className="projects_modal__user_list header">
                            Last Name</th>
                        <th className="projects_modal__user_list header">
                            Username</th>
                        <th className="projects_modal__user_list header">
                            Email</th>
                        <th className="projects_modal__user_list header">
                            Type</th>
                        <th className="projects_modal__user_list header switch">
                            Add to Project</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => <SingleUserForm user={user} selectedObj={selectedObj} />)}
                </tbody>
            </table>
        </ >
    )
}

export default UserListForm
