import { TextField, MenuItem, Zoom, CircularProgress } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { IMarketplaceProduct } from "../../types";
import React, { Dispatch, SetStateAction, useState } from "react";
import DescriptionModal from "./DescriptionModal";
import PopUp from "../Global/PopUp";
import Button from "../Global/Button";
import { useAddOrderMutation } from "../../services/ordersServices";
import { toast } from 'react-toastify';
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";

type ProductProps = {
    props: IMarketplaceProduct,
    setMarketplaceProductsState: Dispatch<SetStateAction<IMarketplaceProduct[]>>
}

const MarketplaceItemCard = ({ props, setMarketplaceProductsState }: ProductProps): JSX.Element => {
    // Description modal state
    const [openModal, setOpenModal] = useState<boolean>(false);
    // Pop-up state
    const [popUpAnchorEl, setPopUpAnchorEl] = useState<HTMLButtonElement | null>(null);
    // const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    // Item quantity state
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    // Add order mutation
    const [addOrder, { isLoading }] = useAddOrderMutation();

    // Description modal open-close functionality
    const handleDescriptionModal = () => {
        setOpenModal(prevState => !prevState);
    };

    // Add order function
    const handleAddOrder = async (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
        // Add order response
        const res = await addOrder({ qty: buyQuantity, productId: props.id });

        // In case there is no error with request
        if ('data' in res) {
            // Update marketplace state
            setMarketplaceProductsState(prevState => prevState.map(x => x.id === props.id ? { ...x, saleQty: x.saleQty - buyQuantity } : x));
            toast.success(`Woohoo! Successfully bought ${props.name} for $${props.price}! 😊`, toastifyCustomStyles);
        }
    }

    const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        setPopUpAnchorEl(null);
    }

    const popUpText = `Are you sure you want to buy ${buyQuantity} ${buyQuantity > 1 ? 'items' : 'item'} for ${buyQuantity * props.price} BGN?`;

    return (
        <>
            {/* Description modal */}
            <DescriptionModal props={{ ...props, open: openModal, handleClose: handleDescriptionModal }} />
            {/* Marketplace item */}
            <Zoom in={true} timeout={500}>
                <div className="item-wrapper">
                    <div className="item-card">
                        <div className="img-wrapper">
                            <img src={props.image ? props.image : '../images/no_image-placeholder.png'} alt="Product image" onClick={() => handleDescriptionModal()} />
                        </div>
                        <div className="item-info">
                            <div className="price-category">
                                <span className="item-price">{props.price} BGN</span>
                                <span className="item-category">{props.category}</span>
                            </div>
                            <div className="quantity-wrapper">
                                <form className="quantity">
                                    <TextField
                                        className="input-field select-field"
                                        id="category"
                                        select
                                        label="Qty"
                                        defaultValue={1}
                                        variant="standard"
                                        onChange={(e) => setBuyQuantity(Number(e.target.value))}
                                    >
                                        {Array(props.saleQty).fill(1).map((n, i) => n + i).map((option) => (
                                            <MenuItem key={option} value={option} sx={{ fontSize: '0.5rem' }}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </form>
                                {!isLoading
                                    ?
                                    <Button
                                        className="buy-btn"
                                        buttonType="button"
                                        buttonText=""
                                        onClick={(e) => setPopUpAnchorEl(e.currentTarget)}
                                    >
                                        <>
                                            <MonetizationOnOutlinedIcon />
                                            {/* Pop-up */}
                                            <PopUp
                                                props={{
                                                    open: Boolean(popUpAnchorEl),
                                                    popUpAnchorEl: popUpAnchorEl,
                                                    placement: 'bottom-end',
                                                    closePopUp: handleClosePopUp,
                                                    text: popUpText,
                                                    confirmFunc: handleAddOrder
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
            </Zoom>
        </>
    )
}

export default MarketplaceItemCard;