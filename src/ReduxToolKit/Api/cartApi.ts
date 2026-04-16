import { baseApi } from './baseApi';
interface SyncCartRequest {
  userId: string;
  items: Record<string, any>;
  totalItems: number;
  subtotal: number;
  lastUpdatedAt: number;
}

interface SyncCartResponse {
  cart: any;
}

interface UpdateCartRequest {
  userId: string;
  productId: string;
  delta: number;
}

interface UpdateCartResponse {
  success: boolean;
  data: {
    status: number;
    message: string;
  };
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCartByUserId: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/app/getCartByUserId/${userId}`,
      providesTags: ['Cart'],
    }),

    syncCart: builder.mutation<SyncCartResponse, SyncCartRequest>({
      query: body => ({
        url: '/app/syncCart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCart: builder.mutation<UpdateCartResponse, UpdateCartRequest>({
      query: body => ({
        url: '/app/incAndDecCartQuantity',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartByUserIdQuery,
  useSyncCartMutation,
  useUpdateCartMutation,
} = cartApi;

export const selectCartResult = cartApi.endpoints.getCartByUserId.select;
