import React from "react";
import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
const Home = loadable(() => import("@pages/Home"));
const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  );
}

export default App;
