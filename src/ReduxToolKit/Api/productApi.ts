import { baseApi } from './baseApi';

type GetProductsByCategoryArgs = {
  childCatId: string;
  cursor?: string;
  limit?: number;
};

const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProductByCatagory: builder.query<any, GetProductsByCategoryArgs>({
      query: ({ childCatId, cursor, limit = 10 }) => ({
        url: `/app/getProductByChildCategoryId/${childCatId}`,
        params: {
          cursor,
          limit,
        },
      }),
    }),
  }),
});


export const { useLazyGetProductByCatagoryQuery,useGetProductByCatagoryQuery } = productApi;