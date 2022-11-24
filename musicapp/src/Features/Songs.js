import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const songsSlice = createSlice({
  name: "songs",
  initialState: initialState,
  reducers: {
    addSongsLib: (state, action) => {
      if (action.payload.length > 1) {
        return [...state, ...action.payload];
      }
    },
  },
});

export default songsSlice.reducer;
export const { addSongsLib } = songsSlice.actions;
