import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../Api/baseApi';
import cartReducer from '../Slices/cartSlice';
import registerDraftReducer from '../Slices/registerDraftSlice';

export const store = configureStore({
  reducer: {
    registerDraft: registerDraftReducer,
    cart: cartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
