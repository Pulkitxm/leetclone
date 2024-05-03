import { atom } from "recoil";

const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const localTheme = localStorage.getItem("theme");

export const themeAtom = atom<"light" | "dark">({
  key: "theme",
  default:
    localTheme == "dark"
      ? "dark"
      : localTheme == "light"
      ? "light"
      : defaultTheme
      ? "dark"
      : "light",
});