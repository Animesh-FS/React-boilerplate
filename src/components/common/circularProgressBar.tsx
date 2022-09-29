import React, { useEffect, useState } from "react";

interface CircularProgressbarProps {
  status: keyof typeof statusWiseBorderColor;
}

const CircularProgressbar = ({ status }: CircularProgressbarProps) => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  // const [hour, setHour] = useState(0);

  var interval: string | number | NodeJS.Timer;
  useEffect(() => {
    timerFunction();
    if (status !== "START") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const timerFunction = () => {
    interval = setInterval(() => {
      setSecond((prev) => prev + 1);
      if (second === 59) {
        setMinute((prev) => prev + 1);
        setSecond(0);
      }
    }, 1000);
  };

  return (
    <div className="relative">
      <div
        className={`loader w-16 h-16 border-6 ${
          statusWiseBorderColor[status]
        } ${status === "START" && "border-t-blue-900"} rounded-full`}
      ></div>

      <div className="absolute text-blue-900 font-equipE font-medium loader-innner-text">
        {`${minute < 10 ? `0${minute}` : minute}:${
          second < 10 ? `0${second}` : second
        }`}
      </div>
    </div>
  );
};

const statusWiseBorderColor = {
  START: "border-neutral-300",
  SUCCESS: "border-green-400",
  ABORTED: "border-red-100",
  FAILURE: "border-red-100",
};

export default CircularProgressbar;
export { CircularProgressbar };
