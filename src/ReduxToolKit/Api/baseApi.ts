import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://9bd4536d5443.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart'],
  endpoints: () => ({}),
});
