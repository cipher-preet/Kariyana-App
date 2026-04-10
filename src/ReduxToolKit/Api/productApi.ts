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

    getRandomProductsForCartPage: builder.query<any, void>({
      query: () => ({
        url: `/app/getRandomProductsForCartPage`,
      }),
    }),

    getProductsbyParentcategoryid: builder.query<
      any,
      GetProductsByCategoryArgs
    >({
      query: ({ childCatId, cursor, limit = 10 }) => ({
        url: `/app/getProductsbycategoryid/${childCatId}`,
        params: {
          cursor,
          limit,
        },
      }),
    }),

    getHomePageData: builder.query<any, any>({
      query: ({ cursor, limit = 10 }) => ({
        url: `/app/getHomePageBannerAndProduct`,
        params: {
          cursor,
          limit,
        },
      }),
    }),

    getTrendSectionDataForHomePage: builder.query<any, void>({
      query: () => ({
        url: `/app/getTrendSectionDataForHomePage`,
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
  useLazyGetRandomProductsForCartPageQuery,
  useLazyGetProductsbyParentcategoryidQuery,
  useGetProductByCatagoryQuery,
  useGetHomePageDataQuery,
  useLazyGetHomePageDataQuery,
  useLazyGetTrendSectionDataForHomePageQuery,
} = productApi;
export const { useGetProductImagesAndHighlightsQuery } =
  productImagesHighlights;
