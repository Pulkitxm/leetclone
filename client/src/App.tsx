import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./index.css";
import Alert from "./components/Alert";
import Login from "./pages/login";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./state/theme";

export default function App() {
  const theme = useRecoilValue(themeAtom);
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
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/:name" element={<div>Problems</div>} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}
