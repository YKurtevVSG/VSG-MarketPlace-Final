import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react/';

export const baseUrl = 'https://auto.loanvantage360.com/internship/EvaluationSystemAngel';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery(({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const user = sessionStorage.getItem('user');
            const token = user && JSON.parse(user).token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    })),
    endpoints: () => ({}),
    keepUnusedDataFor: 0,
    refetchOnMountOrArgChange: true
});

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery(({
        headers: {
            'x-token': 'vanessa&radostina'
        }
    })),
    endpoints: () => ({}),
    keepUnusedDataFor: 86400
});