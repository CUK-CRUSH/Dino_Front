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
  async (username) => {
   
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
          state.playlistData = action.payload;
        } state.lastFetch = Date.now();  // API 호출이 완료된 시간을 기록
      })
      .addCase(fetchPlaylistData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },

});

export default playlistDataSlice.reducer;