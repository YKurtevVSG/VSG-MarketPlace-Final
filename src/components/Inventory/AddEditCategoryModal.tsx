import { CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IAddEditCategoryModal, ICategoryFormInputs } from "../../types";
import Modal from "../Global/ModalWrapper";
import Button from "../Global/Button";
import { useEffect, useState } from "react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCatgeroyMutation } from "../../services/categoriesService";
import { toast } from "react-toastify";
import { toastifyCustomStyles } from "../../utils/toastifyCustomStyles";
import PopUp from "../Global/PopUp";

type AddEditCategoryModalProps = {
    props: IAddEditCategoryModal
}

const AddEditCategoryModal = ({ props }: AddEditCategoryModalProps) => {
    // const [popUpAnchorEl, setPopUpAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [updateCategory] = useUpdateCatgeroyMutation();
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const isEditMode = props.categoryId ? true : false;

    const title = isEditMode ? 'Edit category' : 'Add category';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
        getValues
    } = useForm<ICategoryFormInputs>
            ({
                defaultValues: {
                    name: isEditMode ? props.categoryName : ''
                }
            });

    // Reset form and hooks on close
    useEffect(() => {
        reset();
    }, [props.handleCLose]);

    const onSubmit = async (data: ICategoryFormInputs): Promise<void> => {
        if (isEditMode) {
            const categoryId = props.categoryId;

            const res = await updateCategory({ categoryId, data });

            console.log(data.name)

            if ('data' in res) {
                props.handleCLose();
                // props.setInventoryProducts(prevState => prevState.filter(x => x.id === props.productId));
                props.setInventoryProducts(prevState => prevState.map(x => x.categoryId === props.categoryId ? { ...x, categoryId: categoryId, category: data.name } : x));
                toast.success(`Woohoo! Successfully modified category ${getValues('name')}! 😊`, toastifyCustomStyles);
            }
        } else {
            const res = await createCategory(data);

            if ('data' in res) {
                props.handleCLose();
                toast.success(`Woohoo! Successfully created category ${getValues('name')}! 😊`, toastifyCustomStyles);
            }
        }
    }

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        // setPopUpAnchorEl(null);
        const categoryId = props.categoryId;
        const isCategoryInUse = props.inventoryProducts.some(x => x.categoryId === categoryId);

        if (isCategoryInUse) {
            toast.warning(`Can't delete category! Some products are using this category!`, toastifyCustomStyles);
        } else {
            const res = await deleteCategory(categoryId);

            if ('data' in res) {
                props.handleCLose();
                props.setValue('categoryId', null);
                toast.success(`Successfully deleted ${getValues('name')}! 😊`, toastifyCustomStyles);
            }
        }
    }

    // const handleCLosePopUp = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => {
    //     e.stopPropagation();
    //     setPopUpAnchorEl(null);
    // }

    // const popUpText = `Are you sure you want to delete ${getValues('name')} category?`;

    return (
        <Modal props={{ open: props.open, handleClose: props.handleCLose, modalType: 'category' }}>
            <>
                <h1>{title}</h1>
                <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <TextField
                            className='input-field'
                            id="name"
                            label="Category Name*"
                            defaultValue=""
                            error={errors.name ? true : false}
                            helperText={errors.name ? `${errors.name?.message}` : ' '}
                            variant="standard"
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Category Name is required!'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Category Name must be at least 3 characters long!'
                                }
                            })}
                        />
                    </div>
                    <div className="second-row">
                        {isSubmitting
                            ? <CircularProgress className='loading-spinner' />
                            : isEditMode
                                ?
                                <div className="buttons-container">
                                    <Button buttonType='submit' className={!isDirty ? 'disabled-button' : 'submit-btn'} buttonText={'Modify'} disabled={isSubmitting || !isDirty} />
                                    <Button buttonType="button" className="remove-btn" buttonText="Remove" onClick={(e) => onDelete(e)} />
                                    {/* <PopUp
                                        props={{
                                            open: Boolean(popUpAnchorEl),
                                            popUpAnchorEl: popUpAnchorEl,
                                            placement: 'bottom-end',
                                            closePopUp: handleCLosePopUp,
                                            text: popUpText,
                                            confirmFunc: onDelete
                                        }}
                                    /> */}
                                </div>
                                :
                                <Button buttonType='submit' className={!isDirty ? 'disabled-button' : 'submit-btn'} buttonText={'Add'} disabled={isSubmitting || !isDirty} />
                        }
                    </div>
                </form>
            </>
        </Modal>
    )
}

export default AddEditCategoryModal;