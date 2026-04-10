import { baseApi } from './baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<any[], void>({
      query: () => '/app/getAllChildCategories',
    }),

    getParentcatandTagData: builder.query<any, void>({
      query: () => '/app/getParentcatandTagData',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetParentcatandTagDataQuery } =
  categoryApi;
