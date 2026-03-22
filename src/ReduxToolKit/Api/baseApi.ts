import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://676d-2401-4900-1c70-f000-78b1-41f4-3533-c57.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart', 'Address'],
  endpoints: () => ({}),
});
