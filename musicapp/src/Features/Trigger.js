import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    hidden: false,
  },
};
export const triggerSlice = createSlice({
  name: "trigger",
  initialState: initialState,
  reducers: {
    triggerFn: (state, action) => {
      state.value.hidden = !state.value.hidden;
    },
  },
});

export default triggerSlice.reducer;
export const { triggerFn } = triggerSlice.actions;
