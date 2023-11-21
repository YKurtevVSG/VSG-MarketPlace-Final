import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, CircularProgress, Autocomplete } from '@mui/material';
import { IAddModal, ILendFormInputs, IUser, IUserEmail } from "../../types";
import Modal from "../Global/ModalWrapper";
import Button from "../Global/Button";
import { useEffect } from "react";
import { useAddItemForLentMutation } from "../../services/rentItemsService";
import { toast } from 'react-toastify';
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";
import { useGetUsersQuery } from "../../services/usersService";

type LendModalProps = {
    props: IAddModal
}

const LendItemModal = ({ props }: LendModalProps) => {
    // Form state
    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm({
        defaultValues: {
            email: null,
            quantity: 1
        }
    });

    // Add item for rent product mutation
    const [addItemForRent] = useAddItemForLentMutation();

    // Fetched users
    const { data: users } = useGetUsersQuery();

    // Form submit function
    const onSubmit = async (data: ILendFormInputs): Promise<void> => {
        const res = await addItemForRent({ productId: props.id, lentBy: data.email?.value, qty: data.quantity });

        if ('data' in res) {
            // Update inventory state
            props.setInventoryProducts(prevState => prevState.map(x => x.id === props.id ? { ...x, lendQty: x.lendQty - data.quantity } : x));
            props.handleClose();
            toast.success('Woohoo! Successfully lended item! 😊', toastifyCustomStyles);
        }
    }

    // Reset form and hooks on close
    useEffect(() => {
        reset();
    }, [props.handleClose]);

    let imageSrc;

    if (props.image) {
        imageSrc = props.image === null ? '../images/no_image-placeholder.png' : props.image;
    }

    // const imageSrc = props.image === null ? '../images/no_image-placeholder.png' : props.image;

    const usersList = users?.map((x: IUser) => ({ label: x.name, value: x.email })) as IUserEmail[];

    return (
        <Modal props={{ open: props.open, handleClose: props.handleClose, modalType: 'lend' }}>
            <>
                <h1>Lend {props.name}</h1>
                <img src={imageSrc} alt="Product image" className="lend-modal-img" />
                <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <Controller
                            control={control}
                            name='email'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Email is required!'
                                }
                            }}
                            render={({
                                field: { onChange, value }
                            }) => (
                                <Autocomplete
                                    id="email-autocomplete"
                                    options={usersList}
                                    sx={{ width: '300px' }}
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            className="input-field select-field"
                                            label="Email*"
                                            defaultValue=""
                                            error={errors.email ? true : false}
                                            helperText={errors.email ? `${errors.email?.message}` : ' '}
                                            variant="standard"
                                            {...params}
                                        >
                                        </TextField>
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="input-container">
                        <Controller
                            control={control}
                            name="quantity"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Quantity for lend is required!'
                                }
                            }}
                            render={({
                                field: { onChange, value }
                            }) => (
                                <TextField
                                    className="input-field select-field"
                                    id="qunatity"
                                    select
                                    label="Quantity for lend*"
                                    defaultValue=""
                                    error={errors.quantity ? true : false}
                                    helperText={errors.quantity ? `${errors.quantity?.message}` : ' '}
                                    variant="standard"
                                    onChange={onChange}
                                    value={value}
                                >
                                    {Array(props.lendQty).fill(1).map((n, i) => n + i).map((option) => (
                                        <MenuItem key={option} value={option} sx={{ fontSize: '0.5rem' }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </div>
                    <div className="second-row">
                        {isSubmitting
                            ? <CircularProgress className="loading-spinner" />
                            : <Button buttonType="submit" className="submit-btn" buttonText="Lend" />
                        }
                    </div>
                </form>
            </>
        </Modal>
    )
}

export default LendItemModal;