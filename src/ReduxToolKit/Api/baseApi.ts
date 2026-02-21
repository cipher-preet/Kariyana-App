import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://3ee2-2401-4900-1c6e-99a8-3722-5677-97af-2cb2.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart'],
  endpoints: () => ({}),
});
