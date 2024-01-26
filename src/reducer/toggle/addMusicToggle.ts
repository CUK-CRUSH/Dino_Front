import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInformation: false,
};

const addMusicInformationToggle = createSlice({
  name: "addMusicInformationToggle",
  initialState,
  reducers: {
    toggleShowInformation: (state) => {
      state.showInformation = !state.showInformation;
    },
  },
});

export const { toggleShowInformation } = addMusicInformationToggle.actions;
export default addMusicInformationToggle.reducer;
