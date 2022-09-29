import * as React from "react";
import { ArrowRight, ArrowLeft } from "../Icons";

interface SidebarCollapserProps {
  activeStatus: boolean;
  collapseHandler: () => {};
}
const SidebarCollapser = ({
  activeStatus = false,
  collapseHandler,
}: SidebarCollapserProps) => {
  return (
    <div
      className="text-blue-900 absolute bg-white  bottom-8 pt-1 pr-1.5 pb-1 pl-0.5 rounded-tr-2.5xl rounded-br-2.5xl"
      onClick={collapseHandler}
    >
      {!activeStatus ? <ArrowRight /> : <ArrowLeft />}
    </div>
  );
};

export default SidebarCollapser;
