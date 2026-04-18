import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload;
      state.isLoggedIn = true;
    },

    logoutUser: state => {
      state.user = null;
      state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
