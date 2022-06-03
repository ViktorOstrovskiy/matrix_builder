import { configureStore } from "@reduxjs/toolkit";
import matrixReducer from "./matrix-service/action";

export default configureStore({
  reducer: {
    matrix: matrixReducer,
  },
});
