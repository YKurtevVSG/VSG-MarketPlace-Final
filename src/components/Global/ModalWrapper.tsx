import { Dialog, Zoom, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IModalWrapper } from '../../types';

type ModalWrapperProps = {
    props: IModalWrapper
    children: JSX.Element
}

const Modal = ({ props, children }: ModalWrapperProps) => {
    return (
        <Dialog
            className='modal'
            open={props.open}
            onClose={() => props.handleClose()}
            // TransitionComponent={Zoom}
            // transitionDuration={300}
            sx={{
                '.MuiPaper-root': {
                    height: props.modalType === 'lend' ? '500px' : props.modalType === 'category' ? '180px' : '785px',
                    width: props.modalType === 'lend' ? '350px' : props.modalType === 'category' ? '300px' : '550px',
                    padding: props.modalType === 'description' ? '0' : '55px 40px 45px 40px',
                    fontFamily: props.modalType === 'description' ? "'Roboto', sans-serif" : "'Inter', sans-serif",
                },
                '@media (max-width: 768px)': {
                    '.MuiPaper-root': {
                        padding: props.modalType === 'description' ? '0' : '20px',
                    }
                }
            }}
        >
            {children}
            <IconButton
                className='close-btn'
                aria-label="close"
                onClick={() => props.handleClose()}
            >
                <CloseIcon />
            </IconButton>
        </Dialog>
    )
}

export default Modal;