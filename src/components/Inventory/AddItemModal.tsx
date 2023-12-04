import { TextField, MenuItem, CircularProgress, IconButton, Icon } from '@mui/material';
import Button from '../Global/Button';
import { IAddModal, ICategory, IFormInputs } from '../../types';
import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Modal from '../Global/ModalWrapper';
import { useUploadImageMutation } from '../../services/imagesService';
import { useAddProductMutation } from '../../services/productsService';
import { useGetCategoriesQuery } from '../../services/categoriesService';
import { useGetLocationsQuery } from '../../services/locationService';
import { toastifyCustomStyles } from '../../utils/toastifyCustomStyles';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddEditCategoryModal from './AddEditCategoryModal';

type AddModalProps = {
    props: IAddModal
}

const AddItemModal = ({ props }: AddModalProps) => {
    // Form state
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
        watch,
        getValues,
        setValue
    } = useForm<IFormInputs>
            ({
                defaultValues: {
                    code: '',
                    name: '',
                    description: '',
                    categoryId: null,
                    locationId: null,
                    saleQty: 0,
                    lendQty: 0,
                    price: 0,
                    combinedQty: 0,
                    image: ''
                }
            });

    // Image state
    const [imageSrc, setImageSrc] = useState<string>('../images/no_image-placeholder.png');

    const [modalId, setModalId] = useState<number | null>(null);

    // Fetched categories and locations
    const { data: categories } = useGetCategoriesQuery();
    const { data: locations } = useGetLocationsQuery();

    // Add product and upload image mutations
    const [addProduct] = useAddProductMutation();
    const [uploadImage] = useUploadImageMutation();

    // From submit function
    const onSubmit = async (data: IFormInputs): Promise<void> => {
        // Add product response
        const res = await addProduct(data);

        // In case there is no error with request
        if ('data' in res) {
            const productId = 'data' in res && res.data.returnedValue;
            const productCategory = categories?.filter((x: ICategory) => x.id === data.categoryId)[0].name;
            const productLocation = locations?.filter((x: ICategory) => x.id === data.locationId)[0].name;
            let imageUrl = '';

            // In case there is an uploaded image
            if (data.image !== '') {
                const imageFormData = new FormData();
                imageFormData.append('image', data.image[0]);
                // Upload image response
                const resImage = await uploadImage({ imageFormData, productId });
                imageUrl = 'data' in resImage ? resImage.data.url : '';
            }

            setImageSrc('../images/no_image-placeholder.png');

            const addedProduct = {
                ...data,
                id: productId,
                category: productCategory,
                location: productLocation,
                image: imageUrl
            };

            // Update inventory state
            props.setInventoryProducts(prevState => [...prevState, addedProduct]);
            props.handleClose();
            toast.success(`Woohoo! Successfully added item ${data.name}! 😊`, toastifyCustomStyles);
        }
    }

    // Close add modal function
    const closeAddModal = () => {
        props.handleClose();
        setImageSrc('../images/no_image-placeholder.png');
    }

    // Reset form and hooks on close
    useEffect(() => {
        reset();
    }, [props.handleClose]);

    // Change image preview function
    const imageChangeHandler = (e: React.ChangeEvent | React.MouseEvent, action: string) => {
        const files = (e.target as HTMLInputElement).files as FileList;
        if (action === 'add') {
            const imageUrl = URL.createObjectURL(files[0] as File);
            setImageSrc(imageUrl);
        }
        if (action === 'remove') {
            const imageInput = document.querySelector('#add-item-upload-image');
            if (imageInput) {
                (imageInput as HTMLInputElement).value = "";
                setImageSrc('../images/no_image-placeholder.png');
            }
        }
    }

    const handleAddEditCategoryModal = () => {
        setModalId(null);
    }

    return (
        <>
            <Modal props={{ open: props.open, handleClose: closeAddModal, modalType: 'add' }}>
                <>
                    <h1>Add new item</h1>
                    <form id='modal-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="first-row">
                            <div className="first-column">
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="code"
                                        label="Code*"
                                        defaultValue=""
                                        error={errors.code ? true : false}
                                        helperText={errors.code ? `${errors.code?.message}` : ' '}
                                        variant="standard"
                                        {...register('code', {
                                            required: {
                                                value: true,
                                                message: 'Code is required!'
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="name"
                                        label="Name*"
                                        defaultValue=""
                                        error={errors.name ? true : false}
                                        helperText={errors.name ? `${errors.name?.message}` : ' '}
                                        variant="standard"
                                        {...register('name', {
                                            required: {
                                                value: true,
                                                message: 'Name is required!'
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="description"
                                        multiline
                                        rows={4}
                                        label="Description"
                                        defaultValue=""
                                        helperText=' '
                                        variant="standard"
                                        {...register('description')}
                                    />
                                </div>
                                <div className="input-container">
                                    <Controller
                                        control={control}
                                        name='categoryId'
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Category is required!'
                                            }
                                        }}
                                        render={({
                                            field: { onChange, value }
                                        }) => (
                                            <div className='category-wrapper'>
                                                <TextField
                                                    className='input-field select-field'
                                                    id="category"
                                                    select
                                                    label="Category*"
                                                    defaultValue=""
                                                    error={errors.categoryId ? true : false}
                                                    helperText={errors.categoryId ? `${errors.categoryId?.message}` : ' '}
                                                    variant="standard"
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    {categories?.map((x: ICategory) => (
                                                        <MenuItem key={x.id} value={x.id} sx={{ fontSize: '0.5rem' }}>
                                                            {x.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <IconButton onClick={() => setModalId(0)}>
                                                    <AddIcon className='category-add-button' />
                                                </IconButton>
                                                <IconButton onClick={() => setModalId(getValues('categoryId'))} disabled={Boolean(!getValues('categoryId'))}>
                                                    <EditIcon className={getValues('categoryId') ? 'category-edit-button' : 'disabled-edit-button'} />
                                                </IconButton>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className='input-container'>
                                    <Controller
                                        control={control}
                                        name='locationId'
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Location is required!'
                                            }
                                        }}
                                        render={({
                                            field: { onChange, value }
                                        }) => (
                                            <TextField
                                                className='input-field select-field'
                                                id="location"
                                                select
                                                label="Location*"
                                                defaultValue=""
                                                error={errors.locationId ? true : false}
                                                helperText={errors.locationId ? errors.locationId?.message : ' '}
                                                variant="standard"
                                                onChange={onChange}
                                                value={value}
                                            >
                                                {locations?.map((x: ICategory) => (
                                                    <MenuItem key={x.id} value={x.id} sx={{ fontSize: '0.5rem' }}>
                                                        {x.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}

                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="qty-for-sale"
                                        label="Qty for sale"
                                        defaultValue=""
                                        error={errors.saleQty?.message ? true : false}
                                        helperText={errors.saleQty?.message ? `${errors.saleQty?.message}` : ' '}
                                        variant="standard"
                                        {...register('saleQty', {
                                            deps: ['quantity', 'quantityForRent'],
                                            min: {
                                                value: 0,
                                                message: 'Qty for sale must be a positive number!'
                                            },
                                            max: {
                                                value: Number(watch('combinedQty')) - Number(watch('lendQty')),
                                                message: 'Qty for sale must not be greater than total qty!'
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="qty-for-lend"
                                        label="Qty for lend"
                                        defaultValue=""
                                        error={errors.lendQty?.message ? true : false}
                                        helperText={errors.lendQty?.message ? `${errors.lendQty?.message}` : ' '}
                                        variant="standard"
                                        {...register('lendQty', {
                                            deps: ['quantity', 'quantityForRent'],
                                            min: {
                                                value: 0,
                                                message: 'Qty for lend must be a positive number!'
                                            },
                                            max: {
                                                value: Number(watch('combinedQty')) - Number(watch('saleQty')),
                                                message: 'Qty for lend must not be greater than total qty!'
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="price"
                                        label="Sale price"
                                        defaultValue=""
                                        error={errors.price?.message ? true : false}
                                        helperText={errors.price?.message ? `${errors.price?.message}` : ' '}
                                        variant="standard"
                                        {...register('price', {
                                            min: {
                                                value: 0,
                                                message: 'Price must be a positive number!'
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        className='input-field'
                                        id="qty"
                                        label="Qty*"
                                        type='number'
                                        defaultValue=""
                                        error={errors.combinedQty?.message ? true : false}
                                        helperText={errors.combinedQty?.message ? `${errors.combinedQty?.message}` : ' '}
                                        variant="standard"
                                        {...register('combinedQty', {
                                            deps: ['quantityForSale', 'quantityForRent'],
                                            required: {
                                                value: true,
                                                message: 'Qty is required!'
                                            },
                                            min: {
                                                value: Number(watch('saleQty')) + Number(watch('lendQty')),
                                                message: 'Qty must not be less then qty for sale + qty for lend!'
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="second-column">
                                <img src={imageSrc} id="add-item-image"
                                    alt="Photo preview" />
                                <div className="upload-remove-btn">
                                    <label htmlFor="add-item-upload-image">Upload</label>
                                    <input
                                        type="file"
                                        className="hidden-upload-input"
                                        id="add-item-upload-image"
                                        {...register('image', {
                                            onChange: (e) => imageChangeHandler(e, 'add')
                                        })}
                                    />
                                    <Button
                                        buttonType='button'
                                        className='remove-upload-image-btn'
                                        buttonText='Remove'
                                        onClick={(e) => {
                                            imageChangeHandler(e, 'remove');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="second-row">
                            {isSubmitting
                                ? <CircularProgress className='loading-spinner' />
                                : <Button buttonType='submit' className='submit-btn' buttonText='Add' disabled={isSubmitting} />
                            }
                        </div>
                    </form>
                </>
            </Modal>

            {
                modalId !== null &&
                <AddEditCategoryModal
                    props={{
                        open: true,
                        handleCLose: handleAddEditCategoryModal,
                        categoryId: modalId,
                        categoryName: categories?.find(x => x.id === getValues('categoryId'))?.name,
                        setValue: setValue,
                        setInventoryProducts: props.setInventoryProducts,
                        inventoryProducts: props.inventoryProducts
                    }}
                />
            }
        </>
    )
}

export default AddItemModal