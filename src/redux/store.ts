import { configureStore } from '@reduxjs/toolkit';
import { baseApi, usersApi } from '../utils/baseApi';
import { baseApiMiddleware } from '../utils/baseApiMiddleware';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, usersApi.middleware, baseApiMiddleware),
})