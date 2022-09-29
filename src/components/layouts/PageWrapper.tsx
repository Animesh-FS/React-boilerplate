import React from "react";

interface pageWrapperProps {
  children: JSX.Element | JSX.Element[];
}
const PageWrapper = ({ children }: pageWrapperProps) => {
  return <div className="w-full h-full p-5 overflow-y-auto">{children}</div>;
};

export default PageWrapper;
export { PageWrapper };
