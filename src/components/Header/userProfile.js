import React from "react";
import { DefaultUserImage, ArrowDown } from "../Icons";
const UserProfile = () => {
  return (
    <>
      <div className="flex items-center">
        <DefaultUserImage />
        <div className="flex items-start">
          <div className="px-4">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-sm font-light">Admin</div>
          </div>
          <div className="pt-1.5">
            <ArrowDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
export { UserProfile };
