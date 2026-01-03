import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  isLoading: boolean
}

const initialState: AppState = {
  isLoading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    stopLoading: (state) => {
      state.isLoading = false
    },
  },
})

export const { startLoading, stopLoading } = appSlice.actions
export default appSlice.reducer
