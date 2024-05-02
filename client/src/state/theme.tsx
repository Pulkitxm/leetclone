import { atom } from "recoil";

const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeAtom = atom<"light" | "dark">({
  key: "theme",
  default: defaultTheme ? "dark" : "light",
});
