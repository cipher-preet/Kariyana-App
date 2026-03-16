import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://56bd-2401-4900-1c2b-5904-7da8-e236-e715-3249.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart'],
  endpoints: () => ({}),
});
