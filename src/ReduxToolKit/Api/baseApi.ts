import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7ffb68f79e1b.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart'],
  endpoints: () => ({}),
});
