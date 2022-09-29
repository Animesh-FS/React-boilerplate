import React from "react";
import { LoadingDots } from "../Icons";

const Loader = () => {
  return (
    <div
      className={`w-full h-full absolute flex items-center justify-center top-0 bottom-0 z-10 bg-white bg-opacity-60 `}
    >
      <span className="sr-only">Loading</span>
      <LoadingDots />
    </div>
  );
};

export { Loader };
