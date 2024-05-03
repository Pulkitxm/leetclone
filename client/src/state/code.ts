import { atom } from "recoil";

export type allProbsAtomType = {
  name: string;
  difficulty: string;
  topics: string[];
  id: string;
};

export const allProbsAtom = atom<allProbsAtomType[] | []>({
  key: "allProbs",
  default: [],
});