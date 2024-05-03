import { Navbar, Typography } from "@material-tailwind/react";
import ProfileMenu from "./PrrofileMenu";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function ComplexNavbar() {
  const [cookies] = useCookies(["token"]);
  return (
    <Navbar
      className="w-screen py-2 lg:px-20 dark:bg-[#0f0f0f] rounded-none"
      style={{
        maxWidth: "100vw",
      }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-black dark:text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Link to="/">
            Leetcode
          </Link>
        </Typography>
        {cookies && cookies.token ? (
          <ProfileMenu />
        ) : (
          <Typography
            as="a"
            className="mr-4 cursor-pointer py-1.5 font-medium text-black dark:text-white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link to={"/login"}>
              Login
            </Link>
            &nbsp;or&nbsp;
            <Link to={"/register"}>
              Register
            </Link>
          </Typography>
        )}
      </div>
    </Navbar>
  );
}
