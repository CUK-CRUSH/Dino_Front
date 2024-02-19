import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/index";
import "./styles/font.css";
import { RecoilRoot } from "recoil";

const Home = loadable(() => import("@pages/Home/home"));
const LogIn = loadable(() => import("@pages/LogIn/login"));
const SetProfile = loadable(() => import("@pages/SetProfile/SetProfile"));
const Admin = loadable(() => import("@pages/Admin/Admin"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const Validation = loadable(() => import("@pages/Validation/validation"));
const AddMusic = loadable(() => import("@pages/AddMusic/addMusic"));
const EditMusic = loadable(() => import("@pages/EditMusic/EditMusics"));
const Redirect = loadable(() => import("@pages/Redirect/Redirect"));
const Like = loadable(() => import("@pages/Likes/Like"));
const Environment = loadable(() => import("@pages/Environment/Environment"));
const Prepare = loadable(() => import("@utils/Preparation"));
const NotFound = loadable(() => import("@pages/NotFound/NotFonud"));

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route
                path="/SetProfile/:username/:step"
                element={<SetProfile />}
              />
              <Route path="user/:username" element={<Admin />} />

              <Route
                path="user/:username/:playlistId"
                element={<EditPlayList />}
              />
              <Route path="/login/validation" element={<Validation />} />
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
              <Route path="user/:username/env" element={<Environment />} />
              <Route path="/redirect" element={<Redirect />} />
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
