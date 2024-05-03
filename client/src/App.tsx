import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeAtom } from "./state/theme";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import Alert from "./components/Alert";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getProblems } from "./utils/problems";
import { allProbsAtom } from "./state/code";

export default function App() {
  const theme = useRecoilValue(themeAtom);
  const setAllProbs = useSetRecoilState(allProbsAtom);
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      const isDarkMode = theme === "dark";
      if (isDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);
  useEffect(() => {
    getProblems().then((res) => setAllProbs(res));
  }, [setAllProbs]);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:name" element={<div>Problems</div>} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}
