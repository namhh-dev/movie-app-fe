import { createSlice } from "@reduxjs/toolkit";

export const yearSlice = createSlice({
  name: "year",
  initialState: {
    isLoading: false,
    dataYear: [],
  },
  reducers: {
    getDataYearRequest: (state) => {
      state.isLoading = true;
    },
    getDataYearSuccess: (state, action) => {
      state.isLoading = false;
      state.dataYear = action.payload;
    },
    getDataYearFailure: (state) => {
      state.isLoading = false;
    },
  },
});
