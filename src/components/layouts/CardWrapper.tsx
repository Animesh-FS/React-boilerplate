import * as React from "react";

interface CardWrapperProps {
  children: JSX.Element | JSX.Element[];
  //   attr?: HTMLAttributes<HTMLDivElement>
  //   className?: string
  //   children?: JSX.Element | JSX.Element[]
  //   onClick?: MouseEventHandler<HTMLDivElement>
  //   role?: string
}
const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="bg-white w-80  p-2 rounded-xl flex flex-col h-76 relative rounded-xl m-1 grow">
      {children}
    </div>
  );
};

export default CardWrapper;
export { CardWrapper };
