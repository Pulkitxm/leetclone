import axios from "axios";
import { baseUrl } from "../config";
import { allProbsAtomType } from "../state/code";

export const getProblems = async():Promise<allProbsAtomType> => {
    const res= await axios.get(baseUrl+"/api/_v1/codes");
    return res.data;
};