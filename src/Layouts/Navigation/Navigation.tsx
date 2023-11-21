import { NavLink } from 'react-router-dom';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useMsal } from '@azure/msal-react'
import { onThemeChange } from '../../utils/themeChangeFunction';
import { Avatar } from '@mui/material';
import { useGetUsersQuery } from '../../services/usersService';
import { IUser } from '../../types';

type NavigationProps = {
    handleOpenNav: () => void
}

const Navigation = (props: NavigationProps): JSX.Element => {
    // Fetched users
    const { data: users } = useGetUsersQuery();

    const { instance } = useMsal();

    // Logout function
    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/"
        });
        sessionStorage.clear();
    }

    // Get user name, email and type
    const user = sessionStorage.getItem('user');
    const name = user !== null && JSON.parse(user).username;
    const email = user !== null && JSON.parse(user).email;
    const userType = user !== null && JSON.parse(user).userType;

    // Get profile photo
    const userPhoto = users?.find((x: IUser) => x.email.toLowerCase() === email)?.avatar;

    return (
        <aside>
            <div id="prepend-container">
                <div id="user-info">
                    <span>Hi, {name}</span>
                    <Avatar className="avatar" src={userPhoto} />
                </div>
                <div className="dark-mode-switch-container">
                    <label className="toggle">
                        <input className="toggle-checkbox" type="checkbox" id="dark-mode-header" defaultChecked={localStorage.getItem('theme') === 'dark'} onClick={(e) => onThemeChange(e)} />
                        <div className="toggle-switch"></div>
                        <span className="toggle-label">Dark mode</span>
                    </label>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/marketplace" onClick={props.handleOpenNav}>
                            <StorefrontOutlinedIcon className='nav-svg' />
                            Marketplace
                        </NavLink>
                    </li>
                    {userType === 'Admin'
                        ?
                        < li >
                            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/inventory" onClick={props.handleOpenNav}>
                                <AssignmentOutlinedIcon className='nav-svg' />
                                Inventory
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    {userType === 'Admin'
                        ?
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/pending-orders" onClick={props.handleOpenNav}>
                                <PendingActionsOutlinedIcon className='nav-svg' />
                                Pending orders
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/my-orders" onClick={props.handleOpenNav}>
                            <LocalMallOutlinedIcon className='nav-svg' />
                            My orders
                        </NavLink>
                    </li>
                    {userType === 'Admin'
                        ?
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/lended-items" onClick={props.handleOpenNav}>
                                <StorageOutlinedIcon className='nav-svg' />
                                Lended Items
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/my-lended-items" onClick={props.handleOpenNav}>
                            <WorkHistoryOutlinedIcon className='nav-svg' />
                            My lended items
                        </NavLink>
                    </li>
                    <li onClick={() => handleLogout()}>
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">
                            <LogoutOutlinedIcon className='nav-svg' />
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside >
    )
}

export default Navigation;