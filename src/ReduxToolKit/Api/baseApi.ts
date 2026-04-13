import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://f0ca-223-178-208-13.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart', 'Address', 'User'],
  endpoints: () => ({}),
});
