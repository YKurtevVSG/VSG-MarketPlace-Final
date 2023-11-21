import { IUser } from "../types";
import { usersApi } from "../utils/baseApi";

const GetUsers = 'getUsers';

const usersService = usersApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetUsers]: builder.query<IUser[], void>({
            query: () => 'https://sm-server.netlify.app/.netlify/functions/get_all_employees_data_from_bob',
            transformResponse: (response: any) => response.employees
        })
    })
})

export const {
    useGetUsersQuery
} = usersService;