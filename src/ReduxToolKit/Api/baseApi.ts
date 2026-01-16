import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.14:5000/api/v1',
    credentials: 'include',
  }),
   tagTypes: ['Cart'],
  endpoints: () => ({}),
});
