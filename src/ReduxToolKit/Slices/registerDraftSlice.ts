import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterDraft {
  name: string;
  dateofbirth: string;
  address: string;
  shopName: string;
  Type: string;
  gstNumber?: string;
  tenureOfShop?: string;
  Dsale: string;
  Msales: string;
  shopPhotos?: string | null;
}

const initialState : RegisterDraft = {
  name: '',
  dateofbirth: '',
  address: '',
  shopName: '',
  Type: '',
  gstNumber: '',
  tenureOfShop: '',
  Dsale: '',
  Msales: '',
  shopPhotos: ''
}

const registerDraftSlice = createSlice({
    name:'registerDraft',
    initialState,
    reducers:{
        updateDraft(state,action:PayloadAction<Partial<RegisterDraft>>){
            Object.assign(state, action.payload);
        },
        clearDraft() {
            return {...initialState};
        }
    }
})

export const { updateDraft, clearDraft } = registerDraftSlice.actions;
export default registerDraftSlice.reducer;