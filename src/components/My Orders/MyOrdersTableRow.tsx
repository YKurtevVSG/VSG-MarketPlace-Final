import { Fade, CircularProgress } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { IOrder } from "../../types";
import Button from "../Global/Button";
import { useState, Dispatch, SetStateAction } from "react";
import PopUp from "../Global/PopUp";
import { useRejectOrderMutation } from "../../services/ordersServices";
import { toast } from 'react-toastify';
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";

type OrderProps = {
    props: IOrder,
    setMyOrdersState: Dispatch<SetStateAction<IOrder[]>>
}

const MyOrdersTableRow = ({ props, setMyOrdersState }: OrderProps) => {
    // Pop-up state
    const [popUpAnchorEl, setPopUpAnchorEl] = useState<HTMLButtonElement | null>(null);
    // Reject order mutation
    const [rejectOrder, { isLoading }] = useRejectOrderMutation();

    // Reject order function
    const handleRejectOrder = async (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
        // Reject order response
        const res = await rejectOrder(props.id);

        // In case there is no error in request
        if ('data' in res) {
            // Update my orders state
            setMyOrdersState(prevState => prevState.map(x => x.id === props.id ? { ...x, status: 'Declined' } : x));
            toast.success(`Woohoo! Successfully rejected order! 😊`, toastifyCustomStyles);
        }
    }

    const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
    }

    const popUpText = 'Are you sure you want to reject this order?';

    return (
        <Fade in={true} timeout={800}>
            <div className="table-row-my-orders">
                <div className="col col-1" data-before="Name:">{props.productName}</div>
                <div className="table-first-group">
                    <div className="col col-2" data-before="Qty:">{props.qty}</div>
                    <div className="col col-3" data-before="Price:">{props.price} BGN</div>
                </div>
                <div className="table-second-group">
                    <div className="col col-4" data-before="Order Date:">{props.date}</div>
                    <div className="col col-5" data-before="Status:">
                        <div className="status">
                            <span className="status-message">{props.status}</span>
                            {props.status === "Finished" || props.status === "Declined"
                                ? ''
                                :
                                !isLoading
                                    ?
                                    <Button
                                        className="cancel-btn"
                                        buttonType="button"
                                        buttonText=""
                                        onClick={(e) => setPopUpAnchorEl(e.currentTarget)}
                                    >
                                        <>
                                            <ClearIcon />
                                            {/* Pop-up */}
                                            <PopUp
                                                props={{
                                                    open: Boolean(popUpAnchorEl),
                                                    popUpAnchorEl: popUpAnchorEl,
                                                    placement: 'bottom-end',
                                                    closePopUp: handleClosePopUp,
                                                    text: popUpText,
                                                    confirmFunc: handleRejectOrder
                                                }}
                                            />
                                        </>
                                    </Button>
                                    :
                                    <CircularProgress className="loading-spinner" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default MyOrdersTableRow;