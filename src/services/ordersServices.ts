import { IOrder } from "../types";
import { baseApi } from "../utils/baseApi";

const GetPendingOrders = 'getPendingOrders';
const GetMyOrders = 'getMyOrders';
const AddOrder = 'addOrder';
const CompleteOrder = 'completeOrder';
const RejectOrder = 'rejectOrder';

const ordersServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetPendingOrders]: builder.query<IOrder[], void>({
            query: () => '/Order'
        }),
        [GetMyOrders]: builder.query<IOrder[], void>({
            query: () => `/Order/My-Orders`
        }),
        [AddOrder]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/Order',
                body: data
            })
        }),
        [CompleteOrder]: builder.mutation({
            query: (orderId) => ({
                method: 'PUT',
                url: `/Order/Complete/${orderId}`
            })
        }),
        [RejectOrder]: builder.mutation({
            query: (orderId) => ({
                method: 'PUT',
                url: `/Order/Reject/${orderId}`
            })
        })
    })
})

export const {
    useGetPendingOrdersQuery,
    useGetMyOrdersQuery,
    useAddOrderMutation,
    useCompleteOrderMutation,
    useRejectOrderMutation
} = ordersServices;