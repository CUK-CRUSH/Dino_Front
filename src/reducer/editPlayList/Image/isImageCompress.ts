import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedFileState {
  selectedFile: File | null;
  isLoading: boolean;
}

const initialState: SelectedFileState = {
  selectedFile: null,
  isLoading: false,
};

const selectedFileSlice = createSlice({
  name: "selectedFile",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<File | null>) => {
      state.selectedFile = action.payload;
    },
    resetSelectedFile: (state) => {
      state.selectedFile = null;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSelectedFile, resetSelectedFile, setIsLoading } =
  selectedFileSlice.actions;

export default selectedFileSlice.reducer;
