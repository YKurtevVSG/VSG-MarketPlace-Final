import { Fade, CircularProgress } from "@mui/material";
import { IOrder } from "../../types";
import { Dispatch, SetStateAction } from 'react';
import Button from "../Global/Button";
import { useCompleteOrderMutation } from "../../services/ordersServices";
import { toast } from 'react-toastify';
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";

type OrderProps = {
    props: IOrder,
    setPendingOrdersState: Dispatch<SetStateAction<IOrder[]>>
}

const PendingOrdersTableRow = ({ props, setPendingOrdersState }: OrderProps) => {
    // Change order status mutation
    const [changeOrderStatus, { isLoading }] = useCompleteOrderMutation();

    // Complete order function
    const handleCompleteOrder = async () => {
        // Change order status response
        const res = await changeOrderStatus(props.id);

        const modifiedOrder = { ...props, status: 'Complete' };

        // In case there is no error
        if ('data' in res) {
            // Update pending orders state
            setPendingOrdersState(prevState => prevState?.filter(x => x.id !== modifiedOrder.id));
            toast.success(`Woohoo! Successfully completed order! 😊`, toastifyCustomStyles);
        }
    }

    return (
        <Fade in={true} timeout={800}>
            <div className="table-row-pending-orders">
                <div className="table-first-group">
                    <div className="col col-1" data-before="Code">{props.productCode}</div>
                    <div className="col col-2" data-before="Qty">{props.qty}</div>
                    <div className="col col-3" data-before="Price">{props.price} BGN</div>
                </div>
                <div className="table-second-group">
                    <div className="col col-4" data-before="Ordered By:">{props.orderedBy}</div>
                    <div className="col col-5" data-before="Order Date:">{props.date}</div>
                    <div className="col col-6">
                        {!isLoading
                            ?
                            <span>
                                <Button
                                    className="complete-btn"
                                    buttonText="Complete"
                                    buttonType="button"
                                    onClick={() => handleCompleteOrder()}
                                />
                            </span>
                            :
                            <CircularProgress className="loading-spinner" />
                        }
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default PendingOrdersTableRow;