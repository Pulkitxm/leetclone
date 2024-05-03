import React from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { themeAtom } from "../../state/theme";
import { useCookies } from "react-cookie";

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [theme, changeTheme] = useRecoilState(themeAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, removeCookies] = useCookies(["token"]);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <Menu open={isMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJmE1oJBAYuVBVQ2fan32pAk80sP-JLQ2LWmcIVSz7g&s"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList
          className="p-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div
            onClick={() =>
              changeTheme((prev) => (prev == "dark" ? "light" : "dark"))
            }
          >
            <MenuItem
              className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <input
                data-hs-theme-switch=""
                className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-gray-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-gray-700 focus:ring-gray-700 focus:outline-none appearance-none before:inline-block before:size-6 before:bg-white checked:before:bg-gray-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 after:absolute after:end-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:start-1.5 checked:after:end-auto"
                type="checkbox"
                id="darkSwitch"
                checked={theme == "dark"}
              ></input>
              <p>Dark Mode</p>
            </MenuItem>
          </div>
          <div
            onClick={() => {
              removeCookies("token");
              closeMenu();
            }}
          >
            <MenuItem
              className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {React.createElement(PowerIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Sign Out
              </Typography>
            </MenuItem>
          </div>
        </MenuList>
      </Menu>
    </div>
  );
}
