import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3a90-223-178-211-71.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart', 'Address', 'User', 'rating'],
  endpoints: () => ({}),
});
