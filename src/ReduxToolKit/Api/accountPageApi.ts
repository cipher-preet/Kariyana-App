import { baseApi } from './baseApi';

const accountPageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getOrderDetailByuserId: builder.query<
      any,
      { userId: string; cursor?: string | null }
    >({
      query: ({ userId, cursor }) => ({
        url: `/app/getOrderDetailByuserId`,
        params: {
          userId,
          ...(cursor && { cursor }),
        },
      }),
    }),

    getOrderDetailWithOrderId: builder.query<any, any>({
      query: ({ orderId }) => ({
        url: `/app/getOrderDetailWithOrderId?orderId=${orderId}`,
      }),
    }),
  }),
});

export const {
  useGetOrderDetailByuserIdQuery,
  useGetOrderDetailWithOrderIdQuery,
} = accountPageApi;
