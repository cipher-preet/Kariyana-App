// import { baseApi } from './baseApi'

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<
//       { token: string },
//       { phone: string; otp: string }
//     >({
//       query: (body) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Auth'],
//     }),
//   }),
// })

// export const { useLoginMutation } = authApi
