import { Jobs } from "../data";
import { GetLastSuccessfulBuild } from "../services";

//compare Framework up and Framework down last Success build
// return false will disable build btn and vice versa ..
// pageName: FrameworkUp/FrameWorkDown
const CompareLastSuccessBuild = async (
  pageName: "FrameworkUp" | "FrameworkDown"
) => {
  const { data: frameworkUpData, error: frameworkUpError } =
    await GetLastSuccessfulBuild(Jobs.FRAMEWORK_UP);
  const { data: frameworkDownData, error: frameworkDownError } =
    await GetLastSuccessfulBuild(Jobs.FRAMEWORK_DOWN);
  if (!frameworkUpError && !frameworkDownError) {
    const frameworkUpSuccessTime = frameworkUpData.timestamp
      ? new Date(frameworkUpData.timestamp)
      : "no data";
    const frameworkDownSuccessTime = frameworkDownData.timestamp
      ? new Date(frameworkDownData.timestamp)
      : "no data";

    if (
      frameworkDownSuccessTime !== "no data" &&
      frameworkUpSuccessTime !== "no data"
    ) {
      if (frameworkUpSuccessTime > frameworkDownSuccessTime) {
        return pageName === "FrameworkUp" ? true : false;
      } else {
        return pageName === "FrameworkUp" ? false : true;
      }
    } else {
      //no framework build Success
      if (
        frameworkUpSuccessTime === "no data" &&
        frameworkDownSuccessTime === "no data"
      ) {
        return pageName === "FrameworkUp" ? false : true;
      }
      // only frameworkup is success and there is no frameworkdown success build
      else if (
        frameworkUpSuccessTime !== "no data" &&
        frameworkDownSuccessTime === "no data"
      ) {
        return pageName === "FrameworkUp" ? true : false;
      }
    }
  }
};

export { CompareLastSuccessBuild };
