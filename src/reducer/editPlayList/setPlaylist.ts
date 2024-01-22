// setPlaylist.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { getMember } from "@api/member-controller/memberController";

interface Member {
  username: string;
}

interface Playlist {
  playlistName: string;
}

interface InitialState {
  playlist: null | Playlist;
  member: null | Member;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  playlist: null,
  member: null,
  status: "idle",
  error: null,
};

export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async (id: number, thunkAPI) => {
    const member = await getMember(id);
    const playlist = await getPlayList(member.username);
    return { member, playlist };
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.member = action.payload.member;
        state.playlist = action.payload.playlist;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default playlistSlice.reducer;
