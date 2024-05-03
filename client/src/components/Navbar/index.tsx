import { Navbar, Typography } from "@material-tailwind/react";
import ProfileMenu from "./PrrofileMenu";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function ComplexNavbar() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  return (
    // @ts-expect-error___
    <Navbar
      className="w-screen py-2 lg:px-20 dark:bg-[#0f0f0f] rounded-none border-none"
      style={{
        maxWidth: "100vw",
      }}
      placeholder={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Link
          to={"/"}
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-black dark:text-white"
        >
          Leetcode
        </Link>
        {cookies && cookies.token ? (
          <ProfileMenu />
        ) : (
          <div className="mr-4 cursor-pointer py-1.5 font-medium text-black dark:text-white flex">
            <p onClick={() => navigate("/login")}>Login</p>
            &nbsp;or&nbsp;
            <p onClick={() => navigate("/register")}>Register</p>
          </div>
        )}
      </div>
    </Navbar>
  );
}
