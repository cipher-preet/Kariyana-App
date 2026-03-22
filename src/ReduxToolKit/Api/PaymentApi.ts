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

    getUserDileveryAddress: builder.query<any, any>({
      query: ({ userId }) => `/app/getUserDileveryAddress?userId=${userId}`,
      providesTags: ['Address'],
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
  useGetUserDileveryAddressQuery,
  useCreateOrderMutation,
} = PaymentApi;
