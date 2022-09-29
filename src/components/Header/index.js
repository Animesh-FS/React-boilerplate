import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { navMenu } from "./NavMenu";
import "./style.css";
import UserProfile from "./userProfile";
import { PhotonIcon } from "../Icons";
const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const activeMenuHandler = (url) => {
    const isActive = url.find((val) => val === pathname);
    if (isActive) {
      return true;
    }
    return false;
  };

  return (
    <div className="h-17 flex w-full bg-blue-900 flex-row">
      <div
        className="text-white items-center flex w-64 cursor-pointer pl-4"
        onClick={() => history.push("/")}
      >
        <PhotonIcon />
      </div>
      <div className="flex justify-between w-5/6">
        <div className="text-white flex items-center cursor-pointer">
          {navMenu.map((menu, index) => {
            return (
              <div
                key={index}
                className={`relative text-base ${
                  activeMenuHandler(menu.activeUrls)
                    ? "font-medium"
                    : "font-normal"
                } h-full w-40 flex flex-col items-center justify-center `}
                onClick={() => history.push(menu.activeUrls[0])}
              >
                {menu.title}
                {activeMenuHandler(menu.activeUrls) && (
                  <div
                    className={`absolute bottom-0 w-full border-b-4 border-green-400`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex text-white items-center pr-6">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};
export default Header;
export { Header };
