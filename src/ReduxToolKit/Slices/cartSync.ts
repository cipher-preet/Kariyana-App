import debounce from 'lodash.debounce';
import { store } from '../Rtk/store';
import { cartApi } from '../Api/cartApi';
import { replaceCartFromBackend } from './cartSlice';

const debouncedSync = debounce(async () => {
  const state = store.getState().cart;
  if (!state.totalItems) return;

  try {
    const res = await store
      .dispatch(
        cartApi.endpoints.syncCart.initiate({
          userId: state.userId,
          items: state.items,
          totalItems: state.totalItems,
          subtotal: state.subtotal,
          lastUpdatedAt: state.lastUpdatedAt,
        }),
      )
      .unwrap();

    if (res?.cart) {
      store.dispatch(replaceCartFromBackend(res.cart));
    }
  } catch (e) {
    console.log('Cart sync failed silently');
  }
}, 1000);

export const triggerCartSync = () => {
  debouncedSync();
};
