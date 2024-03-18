import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/index";
import "./styles/font.css";
import { RecoilRoot } from "recoil";
import PrivateRoute from '@components/PrivateRouter/PrivateRouter';
import RankingMember from "@pages/Ranking/RankingMember";

const Loading = loadable(() => import("@pages/Loading/Loading"));
const Welcome = loadable(() => import("@pages/Welcome/Welcome"));
const LogIn = loadable(() => import("@pages/LogIn/login"));
const SetProfile = loadable(() => import("@pages/SetProfile/SetProfile"));
const Admin = loadable(() => import("@pages/Admin/Admin"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const Validation = loadable(() => import("@pages/Validation/validation"));
const AddMusic = loadable(() => import("@pages/AddMusic/addMusic"));
const EditMusic = loadable(() => import("@pages/EditMusic/EditMusics"));
const Redirect = loadable(() => import("@pages/Redirect/Redirect"));
const Like = loadable(() => import("@pages/Likes/Like"));
const Search = loadable(() => import("@pages/Search/Search"));
const SearchPlaylistDetail = loadable(
  () => import("@pages/Search/SearchPlaylistDetail")
);
const SearchMemberDetail = loadable(
  () => import("@pages/Search/SearchMemberDetail")
);
const RankingPlaylist = loadable(
  () => import("@pages/Ranking/RankingPlaylist")
)
const Favorites = loadable(() => import("@pages/Favorites/Favorites"));

const Environment = loadable(() => import("@pages/Environment/Environment"));
const Prepare = loadable(() => import("@utils/Preparation"));
const NotFound = loadable(() => import("@pages/NotFound/NotFonud"));
const Unsign = loadable(() => import("@pages/Unsign/Unsign"));
const Visitor = loadable(() => import("@pages/Visit/VisitPage"));

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <Layout>
            <Routes>
            <Route path="/" element={<Loading />} />

              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<LogIn />} />

              {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/SetProfile/:username/:step" element={<SetProfile />} />
              </Route>

              <Route path="user/:username" element={<Admin />} />

              <Route
                path="user/:username/:playlistId"
                element={<EditPlayList />}
              />
               {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
               <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/login/validation" element={<Validation />} />
              </Route>

              <Route
                path="user/:username/:playlistId/edit"
                element={<AddMusic />}
              />
              <Route
                path="user/:username/:playlistId/edit/:musicId"
                element={<EditMusic />}
              />
              <Route
                path="user/:username/:playlistId/like"
                element={<Like />}
              />

              <Route
                path="user/:username/:playlistId/visitor"
                element={<Visitor />}
              />

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env" element={<Environment />} />
              </Route>

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env/unsign" element={<Unsign />} />
              </Route>

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env/favorites" element={<Favorites />} />
              </Route>

              <Route path="/redirect" element={<Redirect />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/search/playlist"
                element={<SearchPlaylistDetail />}
              />
              <Route
                path="/ranking/playlist"
                element={<RankingPlaylist />}
              />
              <Route
                path="/ranking/member"
                element={<RankingMember /> }
              />
              <Route path="/search/member" element={<SearchMemberDetail />} />

              <Route path="/unprepared" element={<Prepare />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
}

export default App;