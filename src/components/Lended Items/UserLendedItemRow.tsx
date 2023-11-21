import { ILendedItem } from "../../types";
import Button from "../Global/Button";
import ClearIcon from '@mui/icons-material/Clear';
import PopUp from "../Global/PopUp";
import { useReturnItemFromLentMutation } from "../../services/rentItemsService";
import { toast } from "react-toastify";
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";
import { Dispatch, SetStateAction, useState } from "react";
import { CircularProgress } from "@mui/material";

type RentedItemProps = {
    props: ILendedItem,
    setLendedItems: Dispatch<SetStateAction<ILendedItem[]>>
}

const UserLendedItemRow = ({ props, setLendedItems }: RentedItemProps) => {
    // Pop-up state
    const [popUpAnchorEl, setPopUpAnchorEl] = useState<HTMLButtonElement | null>(null);
    // Return item mutation
    const [returnItem, { isLoading }] = useReturnItemFromLentMutation();

    // Return item function
    const handleReturnItem = async (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
        // Return item response
        const res = await returnItem(props.id);

        // In case there is no error in request
        if ('data' in res) {
            const endDate = res.data.returnedValue;
            
            // Update lended items state
            setLendedItems(prevState => prevState.map(x => x.id === props.id ? { ...x, endDate: endDate } : x));
            toast.success('Woohoo! Successfully returned item! 😊', toastifyCustomStyles);
        }
    }

    const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
    }

    const popUpText = 'Are you sure you want to mark this item as returned?';

    return (
        <div className="table-row-lended-items">
            <div className="table-first-group">
                <div className="col col-1" data-before="Code:">{props.productCode}</div>
                <div className="col col-2" data-before="Name:">{props.productName}</div>
                <div className="col col-3" data-before="QTY:">{props.qty}</div>
            </div>
            <div className="table-second-group">
                <div className="col col-4" data-before="Lend Date:">{props.startDate}</div>
                <div className="col col-5" data-before="Return Date:">{props.endDate === null ? '-' : props.endDate}</div>
                <div className="col col-6" data-before="Status:">
                    <div className="status">
                        <span className="status-message">{props.endDate === null ? 'In use' : 'Returned'}</span>
                        {props.endDate !== null
                            ? ''
                            : !isLoading
                                ?
                                <Button className="cancel-btn" buttonType="button" buttonText="" onClick={(e) => setPopUpAnchorEl(e.currentTarget)}>
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
                                                confirmFunc: handleReturnItem
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
    )
}

export default UserLendedItemRow;