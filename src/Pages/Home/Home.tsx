import Button from '../../components/Global/Button';
import { setTabTitle } from '../../utils/helperFunctions';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    setTabTitle('VSG Marketplace');

    const { instance } = useMsal();

    const navigate = useNavigate();

    const adminGroup = 'f2123818-3d51-4fe4-990b-b072a80da143';

    // Login function
    const handleLogin = async () => {
        const res = await instance.loginPopup(loginRequest);

        const username = res.account?.name;
        const email = res.account?.username.toLowerCase();
        const token = res.accessToken;
        const groups = JSON.parse(atob(token.split('.')[1])).groups;
        const userType = groups.includes(adminGroup) ? 'Admin' : 'User';

        // Set user info in session storage
        sessionStorage.setItem('user', JSON.stringify({ username, email, token, userType }));

        navigate('/marketplace');
    }

    return (
        <main id="main-container-login">
            <img src="/images/vsg_marketplace_logo.png" alt="VSG Marketplace Logo" />
            <Button
                className='login-btn'
                buttonText='LOGIN'
                buttonType='button'
                onClick={() => handleLogin()}
            />
        </main>
    )
}

export default Home;