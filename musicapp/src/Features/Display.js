import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    display: false,
  },
};
export const displaySlice = createSlice({
  name: "display",
  initialState: initialState,
  reducers: {
    displayFn: (state, action) => {
      state.value.display = !state.value.display;
    },
  },
});

export default displaySlice.reducer;
export const { displayFn } = displaySlice.actions;
