import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@store/index";
import { Member } from "types/Search/Search";
import { getSearchMemberRanking } from "@api/search-controller/searchController";


export const fetchSearchMemberRanking = createAsyncThunk<Member[], void>(
  'searchMemberRanking/fetch',
  async (_, { getState }) => {
    const { lastFetch } = (getState() as RootState).searchMemberRanking;
    const now = Date.now();
    // 마지막으로 데이터를 가져온 시간이 10분 이내라면 API를 호출하지 않음
    if (lastFetch && now - lastFetch < 600000) {
      return [];
    }
    const response = await getSearchMemberRanking();
    if (!response.data) {
      throw new Error("API Response is missing data field");
    }
    return response.data;
  }
);


export const searchMemberRankingSlice = createSlice({
  name: "searchMemberRanking",
  initialState: {
    searchMemberRanking: [] as Member[],
    lastFetch: null as number | null,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMemberRanking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchMemberRanking.fulfilled, (state, action: PayloadAction<Member[]>) => {
        state.status = "idle";
        if (Array.isArray(action.payload)) { // action.payload가 배열인지 확인

          state.searchMemberRanking = [...state.searchMemberRanking, ...action.payload];
        }
        state.lastFetch = Date.now();
      })
      .addCase(fetchSearchMemberRanking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export default searchMemberRankingSlice.reducer;