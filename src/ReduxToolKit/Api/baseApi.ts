import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://5919-223-178-213-6.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart', 'Address', 'User'],
  endpoints: () => ({}),
});
