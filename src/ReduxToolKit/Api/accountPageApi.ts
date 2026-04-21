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
        providesTags: ['rating'],
      }),
    }),

    getOrderDetailWithOrderId: builder.query<any, any>({
      query: ({ orderId }) => ({
        url: `/app/getOrderDetailWithOrderId?orderId=${orderId}`,
      }),
    }),

    getPersonalInformationByUserId: builder.query<any, any>({
      query: ({ userId }) => ({
        url: `/app/getPersonalInformationByUserId?userId=${userId}`,
      }),
    }),

    userRatingProducts: builder.mutation<any, any>({
      query: body => ({
        url: '/app/userRatingProducts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['rating'],
    }),

    shareAppFeedback: builder.mutation<any, any>({
      query: formData => ({
        url: '/app/shareAppFeedback',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetOrderDetailByuserIdQuery,
  useGetOrderDetailWithOrderIdQuery,
  useLazyGetOrderDetailByuserIdQuery,
  useGetPersonalInformationByUserIdQuery,
  useUserRatingProductsMutation,
  useShareAppFeedbackMutation,
} = accountPageApi;
