import { createSlice } from "@reduxjs/toolkit";

const editPlaylistToggle = createSlice({
  name: "editPlaylist",
  initialState: {
    isEditing: false,
  },
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setIsEditing } = editPlaylistToggle.actions;

export default editPlaylistToggle.reducer;
