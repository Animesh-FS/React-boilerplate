import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "../../../components/common";
import ProgressBar from "../../../components/ProgressBar";
import { GetBuildConsoleText, GetLastBuildStatus } from "../../../services";
import { RouterProps } from "../../../types";
import { Jobs } from "../../../data";
import { LoadingDots } from "../../../components/common/loadingDots";
import { Button } from "../../../components/FormComp";
const FrameworkupBuild = ({}: RouterProps) => {
  const [buildLogs, setBuildLogs] = useState("");
  const [showDots, setShowDots] = useState(true);
  const [buildStatus, setBuildStatus] = useState<
    "START" | "ABORTED" | "FAILURE" | "SUCCESS"
  >("START");
  let interval: string | number | NodeJS.Timer;
  useEffect(() => {
    getBuildData();
    return () => clearInterval(interval);
  }, []);

  const getBuildData = () => {
    interval = setInterval(async () => {
      const { data, error } = await GetBuildConsoleText(Jobs.FRAMEWORK_UP);
      if (!error) {
        setBuildLogs(data);
      }
      if (data.includes("Finished")) {
        //get Status of last build
        let { data, error } = await GetLastBuildStatus(Jobs.FRAMEWORK_UP);
        if (!error) {
          setBuildStatus(data.result);
        }
        clearInterval(interval);
        setShowDots(false);
      }
    }, 3000);
  };

  const renderFrameworkMessage = () => {
    let result = {
      START: "Framework initiation in progress.",
      ABORTED: "Framework initiation stopped.",
      FAILURE: "Framework initiation failed.",
      SUCCESS: "Framework is up now.",
    };
    return result[buildStatus];
  };
  return (
    <div className="w-full h-full overflow-y-auto p-5">
      <div className="flex md:flex-row md:justify-between flex-col items-center">
        <div className="font-equipE text-2xxl text-blue-900 font-medium">
          Framework up
        </div>
        {showDots && (
          <div>
            <Button title="Abort Test" type="danger"></Button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl p-6 mt-2">
        <div className="flex lg:justify-between md:flex-col lg:flex-row">
          <div>
            <div className="text-lg text-blue-900 font-equipE">
              {renderFrameworkMessage()}
            </div>
            {buildStatus === "START" && (
              <div className="text-base mt-4 font-inter">
                It will be up soon
              </div>
            )}
          </div>
          <div className="w-16 h-16 mr-4">
            <CircularProgressbar status={buildStatus} />
          </div>
        </div>
        <div className="my-4">
          <ProgressBar progressStatus="2/4" />
        </div>

        <div className="text-xs font-inter">
          <div className=" mb-2">Log</div>
          <div className="border border-neutrals-400 rounded h-auto p-2">
            <div id="p-wrap" className="whitespace-pre-wrap">
              {buildLogs}
              {showDots && <LoadingDots />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkupBuild;
export { FrameworkupBuild };
