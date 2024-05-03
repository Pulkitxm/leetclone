import { useEffect } from "react";
import  Signin from "../components/Signin";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate= useNavigate();
  const [cookies] = useCookies(["token"]);
  useEffect(()=>{
    if(cookies.token){
      navigate("/");
    }
  },[cookies, navigate]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Signin />
    </section>
  );
}