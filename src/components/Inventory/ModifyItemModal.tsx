import { TextField, MenuItem, CircularProgress } from '@mui/material';
import Button from '../Global/Button';
import { IAddModal, ICategory, IFormInputs } from '../../types';
import { IInventoryProduct } from '../../types';
import Modal from '../Global/ModalWrapper';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../services/categoriesService';
import { useModifyProductMutation } from '../../services/productsService';
import { useDeleteImageMutation, useUploadImageMutation } from '../../services/imagesService';
import { useGetLocationsQuery } from '../../services/locationService';
import { toast } from 'react-toastify';
import { toastifyCustomStyles } from '../../utils/toastifyCustomStyles';

type ModifyModalProps = {
    props: {
        modal: IAddModal,
        product: IInventoryProduct
    }
}

const ModifyItemModal = ({ props }: ModifyModalProps) => {
    // Form state
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        watch
    } = useForm<IFormInputs>
            ({
                defaultValues: {
                    code: props.product.code,
                    name: props.product.name,
                    description: props.product.description,
                    categoryId: props.product.categoryId,
                    locationId: props.product.locationId,
                    saleQty: props.product.saleQty,
                    lendQty: props.product.lendQty,
                    price: props.product.price,
                    combinedQty: props.product.combinedQty,
                    image: props.product.image
                }
            });

    //Image state
    const [imageSrc, setImageSrc] = useState<string>(props.product.image === null ? '../images/no_image-placeholder.png' : props.product.image);

    // Fetched categories and locations
    const { data: categories } = useGetCategoriesQuery();
    const { data: locations } = useGetLocationsQuery();

    // Modify product and iamge mutations
    const [modifyProduct] = useModifyProductMutation();
    const [modifyImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    
    // From submit function
    const onSubmit = async (data: IFormInputs): Promise<void> => {
        const productId = props.product.id;

        // Modify product response
        const res = await modifyProduct({
            ...data,
            id: productId
        });

        // In case there is no error with request
        if ('data' in res) {
            const productCategory = categories?.filter((x: ICategory) => x.id === Number(data.categoryId))[0].name;
            const productLocation = locations?.filter((x: ICategory) => x.id === Number(data.locationId))[0].name;

            // If there is an uploaded image - modify image
            if (typeof data.image !== 'string' && data.image !== null) {
                const imageFormData = new FormData();
                imageFormData.append('image', data.image[0]);

                // Modify image
                await modifyImage({ imageFormData, productId });
            }

            // If there is no uploaded image - delte image
            if (data.image !== null && imageSrc === '../images/no_image-placeholder.png') {
                // Delete image
                await deleteImage(productId);
            }

            const modifiedProduct = {
                ...data,
                id: productId,
                category: productCategory,
                location: productLocation
            }

            // Update inventory state
            props.modal.setInventoryProducts(prevState => prevState.map(x => x.id === modifiedProduct.id ? modifiedProduct : x));
            props.modal.handleClose();
            toast.success(`Woohoo! Successfully modified item ${props.product.name}! 😊`, toastifyCustomStyles);
        }
    }

    // Change iamge preview function
    const imageChangeHandler = (e: React.ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files as FileList;
        const imageUrl = URL.createObjectURL(files[0] as File);
        setImageSrc(imageUrl);
    }

    return (
        <Modal props={{ open: props.modal.open, handleClose: props.modal.handleClose, modalType: 'modify' }}>
            <>
                <h1>Modify {props.product.name}</h1>
                <form id='modal-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="first-row">
                        <div className="first-column">
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="code"
                                    label="Code*"
                                    defaultValue={props.product.code}
                                    error={errors.code?.message ? true : false}
                                    helperText={errors.code?.message ? `${errors.code?.message}` : ' '}
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
                                    type='text'
                                    label="Name*"
                                    defaultValue={props.product.name}
                                    error={errors.name?.message ? true : false}
                                    helperText={errors.name?.message ? `${errors.name?.message}` : ' '}
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
                                    type='text'
                                    multiline
                                    rows={4}
                                    label="Description"
                                    defaultValue={props.product.description}
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
                                        <TextField
                                            className='input-field select-field'
                                            id="category"
                                            select
                                            label="Category*"
                                            defaultValue={props.product.categoryId}
                                            error={errors.categoryId?.message ? true : false}
                                            helperText={errors.categoryId?.message ? `${errors.categoryId?.message}` : ' '}
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
                                            defaultValue={props.product.locationId}
                                            error={errors.locationId?.message ? true : false}
                                            helperText={errors.locationId?.message ? `${errors.locationId?.message}` : ' '}
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
                                    type='number'
                                    label="Qty for sale"
                                    defaultValue={props.product.saleQty}
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
                                    type='number'
                                    label="Qty for lend"
                                    defaultValue={props.product.lendQty}
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
                                    type='number'
                                    label="Sale price*"
                                    defaultValue={props.product.price}
                                    error={errors.price?.message ? true : false}
                                    helperText={errors.price?.message ? `${errors.price?.message}` : ' '}
                                    variant="standard"
                                    {...register('price', {
                                        min: {
                                            value: 0,
                                            message: 'Sale price must be a positive number!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="qty"
                                    type='number'
                                    label="Qty*"
                                    defaultValue={props.product.combinedQty}
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
                                            message: 'Qty must not be less than qty for sale + qty for lend!'
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
                                        onChange: (e) => imageChangeHandler(e)
                                    })}
                                />
                                <Button
                                    buttonType='button'
                                    className='remove-upload-image-btn'
                                    buttonText='Remove'
                                    onClick={() => setImageSrc('../images/no_image-placeholder.png')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="second-row">
                        {isSubmitting
                            ? <CircularProgress className='loading-spinner' />
                            : <Button buttonType='submit' className='submit-btn' buttonText='Modify' />
                        }
                    </div>
                </form>
            </>
        </Modal >
    )
}

export default ModifyItemModal;