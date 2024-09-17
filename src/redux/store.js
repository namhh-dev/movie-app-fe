import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./reducer/movieSlice";
import { typeSlice } from "./reducer/typeSlice";
import { yearSlice } from "./reducer/yearSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    type: typeSlice.reducer,
    year: yearSlice.reducer,
  },
});

export default store;
