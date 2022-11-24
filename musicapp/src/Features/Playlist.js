import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    addPlayList: (state, action) => {
      if (action.payload.length > 1) {
        return [...state, ...action.payload];
      }
    },
  },
});

export default playlistSlice.reducer;
export const { addPlayList } = playlistSlice.actions;
