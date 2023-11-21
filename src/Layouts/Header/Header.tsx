import { NavLink } from "react-router-dom";
import { setHeaderTitle } from "../../utils/helperFunctions";
import { onThemeChange } from "../../utils/themeChangeFunction";
import { Avatar } from '@mui/material';
import { useGetUsersQuery } from "../../services/usersService";
import { IUser } from "../../types";

type HeaderProps = {
    handleOpenNav: () => void
}

const Header = (props: HeaderProps): JSX.Element => {
    // Fetched users
    const { data: users } = useGetUsersQuery();

    // Get username and email
    const user = sessionStorage.getItem('user');
    const name = user !== null && JSON.parse(user).username;
    const email = user !== null && JSON.parse(user).email;

    // Get profile photo
    const userPhoto = users?.find((x: IUser) => x.email.toLowerCase() === email)?.avatar;

    return (
        <header>
            <div className="left-container">
                <NavLink to="/marketplace">
                    <img src="/images/vsg-marketplace-mini-logo.png" alt="Marketplace logo" />
                </NavLink>
                <div className="dark-mode-switch-container">
                    <label className="toggle">
                        <input className="toggle-checkbox" type="checkbox" id="dark-mode-header" defaultChecked={localStorage.getItem('theme') === 'dark'} onClick={(e) => onThemeChange(e)} />
                        <div className="toggle-switch"></div>
                        <span className="toggle-label">Dark mode</span>
                    </label>
                </div>
            </div>
            <span id="title">{setHeaderTitle()}</span>
            <div id="user-info">
                <span>Hi, {name}</span>
                <Avatar className="avatar" src={userPhoto} />
                {/* <img src="./public/images/profile-img.png" alt="Profile logo" /> */}
            </div>
            <button id="hamburger-menu-btn" onClick={props.handleOpenNav}>
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24.25 10.25H1.75C1.06 10.25 0.5 9.69 0.5 9C0.5 8.31 1.06 7.75 1.75 7.75H24.25C24.94 7.75 25.5 8.31 25.5 9C25.5 9.69 24.94 10.25 24.25 10.25ZM24.25 2.75H1.75C1.06 2.75 0.5 2.19 0.5 1.5C0.5 0.81 1.06 0.25 1.75 0.25H24.25C24.94 0.25 25.5 0.81 25.5 1.5C25.5 2.19 24.94 2.75 24.25 2.75ZM24.25 17.75H1.75C1.06 17.75 0.5 17.19 0.5 16.5C0.5 15.81 1.06 15.25 1.75 15.25H24.25C24.94 15.25 25.5 15.81 25.5 16.5C25.5 17.19 24.94 17.75 24.25 17.75Z"
                        fill="#ED1C25" />
                </svg>
            </button>
        </header>
    )
}

export default Header;