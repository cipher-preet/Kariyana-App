import { baseApi } from './baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<any[], void>({
      query: () => '/app/getAllChildCategories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
