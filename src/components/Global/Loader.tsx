import { LinearProgress } from '@mui/material';

const Loader = () => {
    return (
        <div className="loading-container">
            <LinearProgress color="error" className="loading-line" />
            <span>Loading...</span>
        </div>
    )
}

export default Loader;