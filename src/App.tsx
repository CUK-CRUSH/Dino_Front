import React from "react";
import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
const Home = loadable(() => import("@pages/Home"));
const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Admin = loadable(() => import("@pages/Admin"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const AddMusic = loadable(() => import("@pages/Addmusic/addMusic"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:id" element={<EditPlayList />} />
      <Route path="/admin/:id/:id" element={<AddMusic />} />
    </Routes>
  );
}

export default App;
