import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import ProfileMenu from "./PrrofileMenu";

export default function ComplexNavbar() {
  return (
    <Navbar
      className="w-screen py-2 lg:px-20"
      style={{
        maxWidth:"100vw"
      }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Leetcode
        </Typography>
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
