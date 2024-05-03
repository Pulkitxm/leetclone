import axios from "axios";
import { baseUrl } from "../config";

export const getProblems = async() => {
    const res= await axios.get(baseUrl+"/api/_v1/codes");
    return res.data;
};

export const getProblem = async(id:string) => {
    const res= await axios.get(baseUrl+"/api/_v1/codes/"+id);
    return res.data;
};