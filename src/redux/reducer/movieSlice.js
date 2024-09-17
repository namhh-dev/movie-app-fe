import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    dataMovie: [],
  },
  reducers: {
    getDataMovieRequest: (state) => {
      state.isLoading = true;
    },
    getDataMovieSuccess: (state, action) => {
      state.isLoading = false;
      state.dataMovie = action.payload;
    },
    getDataMovieFailure: (state) => {
      state.isLoading = false;
    },
  },
});
