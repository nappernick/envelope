import { stack as AdminMenu } from 'react-burger-menu'

export const AdminBurgMenu = () => {

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
                {/* <a className="navbar__link" activeClassName="active" href="">Users</a> */}
            </AdminMenu>
        </div>
    )
}
