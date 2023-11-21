import { IInventoryProduct, IMarketplaceProduct } from "../types";
import { baseApi } from "../utils/baseApi";

const GetMarketplaceProducts = 'getMarketplaceProducts';
const GetInvetoryProducts = 'getInventoryProducts';
const AddProduct = 'addProduct';
const ModifyProduct = 'modifyProduct';
const DeleteProduct = 'deleteProduct';

const productsServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetMarketplaceProducts]: builder.query<IMarketplaceProduct[], void>({
            query: () => '/Product',
        }),
        [GetInvetoryProducts]: builder.query<IInventoryProduct[], void>({
            query: () => '/Product/Inventory'
        }),
        [AddProduct]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/Product',
                body: data
            })
        }),
        [ModifyProduct]: builder.mutation({
            query: (data) => ({
                method: 'PUT',
                url: `/Product/${data.id}`,
                body: data
            })
        }),
        [DeleteProduct]: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/Product/${id}`
            })
        })
    })
});

export const {
    useGetMarketplaceProductsQuery,
    useGetInventoryProductsQuery,
    useAddProductMutation,
    useModifyProductMutation,
    useDeleteProductMutation
} = productsServices;