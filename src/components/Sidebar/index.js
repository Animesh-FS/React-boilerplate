import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { sideBarMenus } from "../../data";

const Sidebar = ({ activeStatus }) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const activeSideBarHandler = (urls) => {
    const isActive = urls.filter((data) => data === pathname);
    if (isActive.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`${
        !activeStatus ? "w-64" : "w-0"
      } flex flex-col h-full transition-all duration-500 ease-in bg-white overflow-y-auto h-full`}
    >
      <div className="flex flex-col p-4">
        {!activeStatus &&
          sideBarMenus.map((nav, key) => {
            return (
              <div
                key={key}
                className={`h-11 p-2 flex items-center rounded  text-sm cursor-pointer ${
                  activeSideBarHandler(nav.url)
                    ? "bg-blue-900 text-white font-medium"
                    : "text-blue-900 font-normal"
                }`}
                onClick={() => history.push(nav.url[0])}
              >
                {nav.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
export { Sidebar };
