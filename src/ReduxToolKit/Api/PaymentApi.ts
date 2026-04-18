import { baseApi } from './baseApi';

export const PaymentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addDeliveryAddress: builder.mutation<any, any>({
      query: body => ({
        url: '/app/addDeliveryAddress',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Address'],
    }),

    updateDeliveryAddress: builder.mutation<any, any>({
      query: body => ({
        url: '/app/updateDeliveryAddress',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Address'],
    }),

    deleteDeliveryAddress: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/app/deleteDeliveryAddress?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),

    getUserDileveryAddress: builder.query<any, any>({
      query: ({ userId }) => `/app/getUserDileveryAddress?userId=${userId}`,
      providesTags: ['Address'],
    }),

    getOrderStatus: builder.query<any, any>({
      query: ({ orderId }) => `/app/getOrderStatus?orderId=${orderId}`,
    }),

    createOrder: builder.mutation<any, any>({
      query: body => ({
        url: '/app/createOrder',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAddDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
  useGetUserDileveryAddressQuery,
  useCreateOrderMutation,
  useGetOrderStatusQuery,
} = PaymentApi;
