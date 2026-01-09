import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.190.8.206:5000/api/v1',
    credentials: 'include',
  }),
   tagTypes: ['Cart'],
  endpoints: () => ({}),
});
