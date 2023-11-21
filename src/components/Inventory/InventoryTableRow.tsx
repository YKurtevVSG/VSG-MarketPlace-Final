import { CircularProgress } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IInventoryProduct } from "../../types";
import React, { Dispatch, SetStateAction, useState } from "react";
import PopUp from "../Global/PopUp";
import ModifyItemModal from "./ModifyItemModal";
import Button from "../Global/Button";
import { useDeleteProductMutation } from "../../services/productsService";
import { toast } from "react-toastify";
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";
import LendItemModal from "./LendItemModal";

type ProductProps = {
    props: IInventoryProduct,
    setInventoryProducts: Dispatch<SetStateAction<IInventoryProduct[]>>
}

const InventoryTableRow = ({ props, setInventoryProducts }: ProductProps) => {
    // Modify modal state
    const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
    // Lend modal state
    const [openLendModal, setOpenLendModal] = useState<boolean>(false);
    // Pop-up state
    const [popUpAnchorEl, setPopUpAnchorEl] = useState<HTMLButtonElement | null>(null);
    // Delete product mutation
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    // Modify modal open-close functionality
    const handleModifyModal = () => {
        setOpenModifyModal(prevState => !prevState);
    };

    // Lend modal open-close functionality
    const handleLendModal = () => {
        setOpenLendModal(prevState => !prevState);
    }

    // Delete product function
    const handleDeleteProduct = async (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
        // Delete product response
        const res = await deleteProduct(props.id);

        // In case there is no error with request
        if ('data' in res) {
            // Update inventory state
            setInventoryProducts(prevState => prevState.filter(x => x.id !== props.id));
            toast.success(`Successfully deleted ${props.name}! 😊`, toastifyCustomStyles);
        }
    }

    const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
    }

    const popUpText = `Are you sure you want to remove this item?`;

    return (
        <>
            {/* Modify modal */}
            <ModifyItemModal
                props={{
                    modal: {
                        open: openModifyModal,
                        handleClose: handleModifyModal,
                        setInventoryProducts: setInventoryProducts
                    },
                    product: {
                        ...props
                    }
                }}
            />
            {/* Lend modal */}
            <LendItemModal
                props={{
                    open: openLendModal,
                    handleClose: handleLendModal,
                    setInventoryProducts: setInventoryProducts,
                    id: props.id,
                    name: props.name,
                    lendQty: props.lendQty,
                    image: props.image
                }}
            />
            {/* Table row */}
            <div className="table-actions">
                {!isLoading
                    ?
                    <>
                        <Button className="modify-btn" buttonType="button" buttonText="" onClick={handleModifyModal}>
                            <ModeEditIcon />
                        </Button>
                        <Button className="delete-btn" buttonType="button" buttonText="" onClick={(e) => setPopUpAnchorEl(e.currentTarget)}>
                            <>
                                <DeleteOutlineIcon />
                                <PopUp
                                    props={{
                                        open: Boolean(popUpAnchorEl),
                                        popUpAnchorEl: popUpAnchorEl,
                                        placement: 'bottom-end',
                                        closePopUp: handleClosePopUp,
                                        text: popUpText,
                                        confirmFunc: handleDeleteProduct
                                    }}
                                />
                            </>
                        </Button>
                        {props.lendQty > 0
                            &&
                            <Button className="lend-btn" buttonType="button" buttonText="" onClick={handleLendModal}>
                                <CalendarMonthIcon />
                            </Button>
                        }
                    </>
                    :
                    <CircularProgress className="loading-spinner" />
                }
            </div>
        </>
    )
}

export default InventoryTableRow;