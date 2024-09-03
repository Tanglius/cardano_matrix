import { createSlice } from "@reduxjs/toolkit";

const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    list: [],
  },
  reducers: {
    setTools(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setTools } = toolsSlice.actions;
export default toolsSlice.reducer;
