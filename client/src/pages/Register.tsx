import { useCookies } from "react-cookie";
import  Signup from "../components/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate= useNavigate();
  const [cookies] = useCookies(["token"]);
  useEffect(()=>{
    if(cookies.token){
      navigate("/signin");
    }
  },[cookies, navigate]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Signup />
    </section>
  );
}