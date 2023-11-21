import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesAuth = () => {
    const user = sessionStorage.getItem('user');
    const token = user !== null && JSON.parse(user).token;

    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutesAuth;