import { getFavoritesPlayList } from "@api/playlist-controller/playlistControl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@store/index";

interface FetchFavoriteListDTO {
  token : string | undefined;
  page: number;
}

interface favoriteList {
  username?: string;
  id: number | undefined,
  playlistName: string,
  thumbnailUrl: string | null,
  numberOfMusics?: number,
  likeCount?: number,
  isLike?: boolean,
}

export const fetchReset = () => {
  
  return;
}

export const fetchFavoriteList = createAsyncThunk<
  favoriteList[],
  FetchFavoriteListDTO,
  { dispatch: AppDispatch; state: RootState }
>("favoriteList/fetchFavoriteList", async ({ token, page }) => {
  const response = await getFavoritesPlayList(token, page);
  console.log(response)
  if (!response.data) {
    throw new Error("API Response is missing data field");
  }

  return response.data;
});

export const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState: {
    favoriteList: [] as favoriteList[],
    currentPage: 0,
    isLast: false,
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    reset: (state) => {
      state.favoriteList = [];
      state.currentPage = 0;
      state.isLast = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteList.fulfilled, (state, action) => {
        state.status = "idle";
        if (Array.isArray(action.payload)) { 
          state.favoriteList = [...state.favoriteList, ...action.payload];
        }
        state.currentPage += 1;
        
        if(action.payload.length < 8) {
          state.isLast = true;  
        }
        
      })
      .addCase(fetchFavoriteList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export default favoriteListSlice.reducer;
