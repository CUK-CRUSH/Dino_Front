import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayList } from "@api/playlist-controller/playlistControl";  // API 호출 함수
import { getPlaylistDTO } from "types/Admin";
import { AppDispatch, RootState } from "@store/index";


export const fetchPlaylistData = createAsyncThunk<
  getPlaylistDTO[],
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>(
  'playlistData/fetchPlaylistData',
  async (username, { getState }) => {
    const { lastFetch } = (getState() as RootState).adminPlaylist;
    const now = Date.now();
    // 마지막으로 데이터를 가져온 시간이 10분 이내라면 API를 호출하지 않음

    if (lastFetch && now - lastFetch < 600000) {
      return;
    }
    const response = await getPlayList(username);
    if (!response.data) {
      throw new Error("API Response is missing data field");
    }

    return response.data;
  }
);


export const playlistDataSlice = createSlice({
  name: "playlistData",
  initialState: {
    playlistData: [] as getPlaylistDTO[],
    lastFetch: null as number | null,  // 새로 추가
    status: "idle",
    error: null as string | null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylistData.fulfilled, (state, action) => {
        state.status = "idle";
        if (Array.isArray(action.payload)) { // action.payload가 배열인지 확인
          state.playlistData = [...state.playlistData, ...action.payload];
        } state.lastFetch = Date.now();  // API 호출이 완료된 시간을 기록
      })
      .addCase(fetchPlaylistData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },

});

export default playlistDataSlice.reducer;