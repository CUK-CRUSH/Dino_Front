import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Music {
  title: string;
  artist: string;
  url: string;
}

interface MusicAddState {
  musics: Music[];
  image: string | null;
  isSaved: boolean;
  title: string; // Add this line
  artist: string; // Add this line
  url: string; // Add this line
}

const initialState: MusicAddState = {
  musics: [],
  image: null,
  isSaved: false,
  title: "", // Add this line
  artist: "", // Add this line
  url: "", // Add this line
};

const musicAddSlice = createSlice({
  name: "musicAdd",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
    },
    updateUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    updateMusic: (state, action: PayloadAction<Music>) => {
      state.musics.push(action.payload);
    },
    updateImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    saveMusic: (state) => {
      state.isSaved = true;
    },
    resetIsSaved: (state) => {
      state.isSaved = false;
    },
    clearMusic: (state) => {
      state.musics = [];
    },
  },
});

export const {
  updateTitle,
  updateArtist,
  updateUrl,
  updateMusic,
  updateImage,
  saveMusic,
  resetIsSaved,
  clearMusic,
} = musicAddSlice.actions;
export default musicAddSlice.reducer;
