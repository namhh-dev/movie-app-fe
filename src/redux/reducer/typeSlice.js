import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    isLoading: false,
    dataType: [],
  },
  reducers: {
    getDataTypeRequest: (state) => {
      state.isLoading = true;
    },
    getDataTypeSuccess: (state, action) => {
      state.isLoading = false;
      state.dataType = action.payload;
    },
    getDataTypeFailure: (state) => {
      state.isLoading = false;
    },
  },
});
