import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { stack as AdminMenu } from 'react-burger-menu'
import { logout } from "../../../store/session"

export const AdminBurgMenu = () => {
    const authenticated = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    const handleClick = (e) => { }

    return (
        <div>
            <AdminMenu
                right
                isOpen={false}
                width=""
            >
                <a className="navbar__link" activeClassName="active" href="/users">Users</a>
                <a className="navbar__link" activeClassName="active" href="/data-sets">Data Sets</a>
                <a className="navbar__link" activeClassName="active" href="/projects">All Projects</a>
                <a className="navbar__link" activeClassName="active" href="">Users</a>
            </AdminMenu>
        </div>
    )
}
