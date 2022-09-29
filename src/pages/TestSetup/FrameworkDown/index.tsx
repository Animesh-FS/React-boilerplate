import React, { useEffect, useState } from "react";
import { Button } from "../../../components/FormComp";
import { PageWrapper } from "../../../components/layouts";
import ProgressBar from "../../../components/ProgressBar";
import { Jobs } from "../../../data";
import { GetLastBuildStatus } from "../../../services";
import { Loader } from "../../../components/common";
import { CompareLastSuccessBuild } from "../../../helpers";
const FrameworkDown = () => {
  const [disablBuildBtn, setDisableBuildBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  let interval: NodeJS.Timer;
  useEffect(() => {
    getLastBuildData();
    return () => clearInterval(interval);
  }, []);

  const getLastBuildData = async () => {
    setLoading(true);
    interval = setInterval(async () => {
      const { data, error } = await GetLastBuildStatus(Jobs.FRAMEWORK_DOWN);
      setLoading(false);
      if (!error) {
        if (!data.inProgress) {
          setDisableBuildBtn(false);
          clearInterval(interval);
          getLastSuccessBuildDatas();
        } else {
          setDisableBuildBtn(true);
        }
      }
    }, 2000);
  };

  const getLastSuccessBuildDatas = async () => {
    const isDisable = await CompareLastSuccessBuild("FrameworkDown");
    setDisableBuildBtn(isDisable);
  };

  return (
    <PageWrapper>
      <div className="flex justify-between">
        <div className="font-equipE font-medium text-2xxl text-blue-900">
          Framework down
        </div>
        <div>
          <Button
            title="Framework down"
            size="large"
            disabled={disablBuildBtn}
          ></Button>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 mt-3">
        <div className="font-equipE text-lg text-blue-900">
          Framework down in progress...
        </div>
        <div className="mt-4 font-inter text-blue-100 text-base">
          Framework is currently working on: &lt;
          <span className="font-medium font-inter">IP Address</span>&gt;,
          started at 13:50
        </div>
        <div className="mt-6">
          <ProgressBar progressStatus="1/5" />
        </div>
      </div>
      {loading && (
        <div className="text-blue-900">
          <Loader />
        </div>
      )}
    </PageWrapper>
  );
};

export default FrameworkDown;
export { FrameworkDown };
