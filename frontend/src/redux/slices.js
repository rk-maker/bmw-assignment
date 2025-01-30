import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  loading: false,
};

const detailSlice = createSlice({
  name: "bmwModelDetails",
  initialState,
  reducers: {
    setDetails(state, action) {
      state.details = action.payload;
    },
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
  },
});

export const { setDetails, showLoader, hideLoader } = detailSlice.actions;

export const selectDetails = (state) => state.bmwModelDetails.details;
export const selectLoading = (state) => state.bmwModelDetails.loading;

export default detailSlice.reducer;
