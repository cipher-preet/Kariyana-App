import { baseApi } from './baseApi';

export interface LoginResponse {
  nextScreen: 'HOME' | 'REGISTER' | 'PENDING' | 'REJECTED';
  userId: string;
  role?: 'BUYER' | 'ADMIN';
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    loginUser: builder.mutation<any, { token: string }>({
      query: ({ token }) => ({
        url: '/auth/loginUser',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const { useLoginUserMutation, useGetMeQuery, useRegisterShopMutation } =
  authApi;
