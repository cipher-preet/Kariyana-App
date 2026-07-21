import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://python-microservice-hub.el.r.appspot.com/api/v1',
    baseUrl: 'https://107a-223-178-212-196.ngrok-free.app/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Cart', 'Address', 'User', 'rating'],
  endpoints: () => ({}),
});
