import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Member, Playlist } from "types/Search/Search";
import { getSearch } from "@api/search-controller/searchController";


export const fetchSearch = createAsyncThunk<{ members: Member[], playlists: Playlist[] }, string | undefined>(
  'search/fetchSearch',
  async (query,) => {

    // 검색추가하기
    const response = await getSearch(query);


    if (!response.data) {
      throw new Error("API Response is missing data field");
    }
    return response.data;
  }
);


export const searchSlice = createSlice({
  name: "search",
  initialState: {
    members: [] as Member[],
    playlists: [] as Playlist[],
    lastFetch: null as number | null,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<{ members: Member[], playlists: Playlist[] }>) => {
        state.status = "idle";

        state.members = action.payload.members;
        state.playlists = action.payload.playlists;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export default searchSlice.reducer;