import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from "./toolsSlice";

const store = configureStore({
  reducer: {
    tools: toolsReducer,
  },
});

export default store;
