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

const productImagesHighlights = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProductImagesAndHighlights: builder.query<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `/dashboard/getProductImagesAndHighlights?productId=${productId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetProductByCatagoryQuery,
  useGetProductByCatagoryQuery,
} = productApi;
export const { useGetProductImagesAndHighlightsQuery } =
  productImagesHighlights;
