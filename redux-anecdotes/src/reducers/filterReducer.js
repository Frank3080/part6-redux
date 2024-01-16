import { createSlice } from "@reduxjs/toolkit";

const startFilter = "";

const filterSlice = createSlice({
  name: "filter",
  initialState: startFilter,
  reducers: {
    change: (state, action) => {
      return action.payload;
    },
  },
});

export const { change } = filterSlice.actions;
export default filterSlice.reducer;
