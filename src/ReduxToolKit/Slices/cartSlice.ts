import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalItems: number;
  subtotal: number;
  lastUpdatedAt: number;
  userId: string;
}

//--------------------------------------------

const intialState: CartState = {
  items: {},
  totalItems: 0,
  subtotal: 0,
  lastUpdatedAt: Date.now(),
  userId: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: intialState,

  reducers: {
    addItemOptimistic: (state, action) => {
      const { product, userId } = action.payload;
      const existing = state.items[product.productId];

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.productId] = {
          ...product,
          quantity: 1,
        };
      }

      state.totalItems += 1;
      state.subtotal += product.price;
      state.userId = userId;
      state.lastUpdatedAt = Date.now();
    },

    removeItemOptimistic: (state, action: PayloadAction<string>) => {
      const item = state.items[action.payload];
      if (!item) return;

      item.quantity -= 1;
      state.totalItems -= 1;
      state.subtotal -= item.price;

      if (item.quantity <= 0) {
        delete state.items[action.payload];
      }
      state.lastUpdatedAt = Date.now();
    },

    restoreCart: (_, action: PayloadAction<CartState>) => {
      return action.payload;
    },

    replaceCartFromBackend: (_, action: PayloadAction<CartState>) => {
      return action.payload;
    },

    clearCart: () => intialState,
  },
});

export const {
  addItemOptimistic,
  removeItemOptimistic,
  restoreCart,
  replaceCartFromBackend,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
