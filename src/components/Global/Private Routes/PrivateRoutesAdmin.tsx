import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesAdmin = () => {
    const user = sessionStorage.getItem('user');
    const userType = user !== null && JSON.parse(user).userType;

    return (
        userType === 'Admin' ? <Outlet /> : <Navigate to='/no-access' />
    )
}

export default PrivateRoutesAdmin;