import { ILendedItem, IUserLendedItems } from "../types";
import { baseApi } from "../utils/baseApi";

const GetLentItems = 'getLentItems';
const GetMyLentItems = 'getMyLentItems';
const AddItemForLent = 'addItemForLent';
const ReturnItemFromLent = 'returnItemFromLent';

const lentItemsServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetLentItems]: builder.query<IUserLendedItems[], void>({
            query: () => '/LentItem',
        }),
        [GetMyLentItems]: builder.query<ILendedItem[], void>({
            query: () => `/LentItem/My-Lent-Items`
        }),
        [AddItemForLent]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/LentItem',
                body: data
            })
        }),
        [ReturnItemFromLent]: builder.mutation({
            query: (id) => ({
                method: 'PUT',
                url: `/LentItem/${id}`
            })
        })
    })
});

export const {
    useGetLentItemsQuery,
    useGetMyLentItemsQuery,
    useAddItemForLentMutation,
    useReturnItemFromLentMutation
} = lentItemsServices;