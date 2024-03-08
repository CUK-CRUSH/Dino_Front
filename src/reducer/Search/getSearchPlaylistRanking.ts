import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { Playlist } from "types/Search/Search";
import { getSearchPlaylistRanking } from "@api/search-controller/searchController";


export const fetchSearchPlaylistRanking = createAsyncThunk<Playlist[], void>(
  'searchPlaylistRanking/fetch',
  async (_, { getState }) => {
    const { lastFetch } = (getState() as RootState).searchPlaylistRanking;
    const now = Date.now();
    // 마지막으로 데이터를 가져온 시간이 10분 이내라면 API를 호출하지 않음
    if (lastFetch && now - lastFetch < 600000) {
      return [];
    }
    const response = await getSearchPlaylistRanking();
    if (!response.data) {
      throw new Error("API Response is missing data field");
    }
    return response.data;
  }
);

export const searchPlaylistRankingSlice = createSlice({
  name: "searchPlaylistRanking",
  initialState: {
    searchPlaylistRanking: [] as Playlist[],
    lastFetch: null as number | null,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPlaylistRanking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchPlaylistRanking.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
        state.status = "idle";
        if (Array.isArray(action.payload)) { // action.payload가 배열인지 확인

          state.searchPlaylistRanking = [...state.searchPlaylistRanking, ...action.payload];
        }
        state.lastFetch = Date.now();
      })
      .addCase(fetchSearchPlaylistRanking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export default searchPlaylistRankingSlice.reducer;