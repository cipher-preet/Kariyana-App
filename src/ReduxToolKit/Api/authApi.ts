import { baseApi } from './baseApi';

export interface LoginResponse {
  nextScreen: 'APPROVED' | 'REGISTER' | 'PENDING' | 'REJECTED';
  userId: string;
  role?: 'BUYER' | 'ADMIN';
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendOtp: builder.mutation<any, { phone: string | number }>({
      query: ({ phone }) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: { phone: Number(phone) },
        withCredentials: true,
      }),
    }),

    verifyOtp: builder.mutation<
      any,
      { phone: string | number; otp: string | number }
    >({
      query: ({ phone, otp }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: { phone: Number(phone), otp: Number(otp) },
        withCredentials: true,
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation<
      any,
      { phone: string | number; otp: string | number }
    >({
      query: ({ phone, otp }) => ({
        url: '/auth/loginUser',
        method: 'POST',
        body: { phone: Number(phone), otp: Number(otp) },
        withCredentials: true,
      }),
      invalidatesTags: ['User'],
    }),

    getMe: builder.query<any, void>({
      query: () => ({
        url: '/auth/verifyme',
        method: 'GET',
        withCredentials: true,
        providesTags: ['User'],
      }),
    }),

    registerShop: builder.mutation<any, any>({
      query: formData => ({
        url: '/auth/registerUser',
        method: 'POST',
        body: formData,
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useRegisterShopMutation,
} = authApi;
