import { Grow } from '@mui/material';
import { setTabTitle } from '../../utils/helperFunctions';

const AdminError = () => {
    setTabTitle('No access');

    return (
        <div id="main-container-no-access">
            <Grow in={true} timeout={500}>
                <div className='no-access-image-text-container'>
                    <span>You shall not pass!</span>
                    <img src="../Images/IMG_3874.GIF" alt="img-error" style={{ background: 'none' }} />
                    <span>You don't have permission to access this page!</span>
                </div>
            </Grow>
        </div>
    )
}

export default AdminError;