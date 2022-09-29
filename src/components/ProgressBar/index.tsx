import React from "react";
// import "./style.scss";

interface ProgressBarProps {
  progressStatus: keyof typeof progressBarSizeMap;
}
const ProgressBar = ({ progressStatus }: ProgressBarProps) => {
  return (
    <div className={`rounded w-full bg-neutrals-300 h-6`}>
      <div
        className={`${progressBarSizeMap[progressStatus]} bg-blue-900 rounded`}
      >
        <span className="text-blue-900 invisible">{progressStatus}</span>
      </div>
    </div>
  );
};

const progressBarSizeMap = {
  "1/5": "w-1/5", //w-1/5	width: 20%;
  "2/5": "w-2/5", //w-2/5	width: 40%;
  "2/4": "w-2/4", //w-2/4 width:50%
  "3/5": "w-3/5", //w-3/5	width: 60%;
  "4/5": "w-4/5", //w-4/5	width: 80%;
};

export default ProgressBar;
