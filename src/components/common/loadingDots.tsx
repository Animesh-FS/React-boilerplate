import React from "react";

const LoadingDots = () => {
  return (
    <div className="loading-dots my-4 inline-flex ">
      <span className="w-2 h-2 bg-blue-900 mx-6 rounded-full "></span>
      <span className="w-2 h-2 bg-blue-900 mx-6 rounded-full "></span>
      <span className="w-2 h-2 bg-blue-900 mx-6 rounded-full"></span>
    </div>
  );
};

export { LoadingDots };
