import { ICategory } from "../types";
import { baseApi } from "../utils/baseApi";

const GetCategories = 'getCategories';
const CreateCategory = 'createCategory';
const UpdateCategory = 'updateCatgeroy';
const DeleteCategory = 'deleteCategory';

const categoriesTag = 'CategopriesTag';

const categoriesServices = baseApi
    .enhanceEndpoints({ addTagTypes: [categoriesTag] })
    .injectEndpoints({
        endpoints: (builder) => ({
            [GetCategories]: builder.query<ICategory[], void>({
                query: () => '/Category',
                providesTags: [categoriesTag]
            }),
            [CreateCategory]: builder.mutation({
                query: (data) => ({
                    method: 'POST',
                    url: '/Category',
                    body: data
                }),
                invalidatesTags: (result, error) => error ? [] : [categoriesTag]
            }),
            [UpdateCategory]: builder.mutation({
                query: ({ categoryId, data }) => ({
                    method: 'PUT',
                    url: `/Category/${categoryId}`,
                    body: data
                }),
                invalidatesTags: (result, error) => error ? [] : [categoriesTag]
            }),
            [DeleteCategory]: builder.mutation({
                query: (categoryId) => ({
                    method: 'DELETE',
                    url: `/Category/${categoryId}`
                }),
                invalidatesTags: (result, error) => error ? [] : [categoriesTag]
            })
        })
    })

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCatgeroyMutation,
    useDeleteCategoryMutation
} = categoriesServices;