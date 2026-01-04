import { baseApi } from './baseApi';

export const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    syncCart: builder.mutation<
      { cart: any },
      {
        userId: string;
        items: Record<string, any>;
        totalItems: number;
        subtotal: number;
        lastUpdatedAt: number;
      }
    >({
      query: body => ({
        url: '/app/syncCart',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSyncCartMutation } = cartApi;
