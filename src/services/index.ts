import $Axios from "../lib/axios";
import {
  JenkinsCrumbApiResponse,
  JOBS_JSON_RESPONSE,
  METHOD_API_RESPONSE,
} from "../types";
const API_URL = process.env.PUBLIC_API_URL;
const GetJenkinsCrumb = async (): Promise<JenkinsCrumbApiResponse> => {
  const options = {
    headers: {
      Authorization: `Basic ${window.btoa("photon:photon")}`,
    },
  };
  const response = await $Axios
    .get<JenkinsCrumbApiResponse>("crumbIssuer/api/json", options)
    .then((res) => {
      console.log(res.headers, res);
      return res.data;
    })
    .catch(() => undefined);
  return response;
};
const GetBuildConsoleText = async (
  jobName: string
): Promise<METHOD_API_RESPONSE<string>> => {
  var config = {
    url: `job/${jobName}/lastBuild/logText/progressiveText?start=0`,
  };
  const response = await $Axios
    .get<string>(config.url)
    .then(function (response) {
      return { data: response.data };
    })
    .catch(function (error) {
      return { error: error };
    });
  return response;
};

// const GetFrameworkLastBuild = async (jobName: string) => {
//   var config = {
//     method: "get",
//     url: `${API_URL}/job/${jobName}/lastBuild/api/json`,
//     headers: {
//       Authorization: `Basic ${window.btoa("photon:photon")}`,
//     },
//   };

//   const response: METHOD_API_RESPONSE<JOBS_JSON_RESPONSE> = await $Axios(config)
//     .then(function (response) {
//       return { data: response.data };
//     })
//     .catch(function (error) {
//       return { error: error };
//     });
//   return response;
// };

const GetLastBuildStatus = async (
  jobName: string
): Promise<METHOD_API_RESPONSE<JOBS_JSON_RESPONSE>> => {
  // const { data, error } = await getFrameworkLastBuild(jobName);

  var config = {
    url: `${API_URL}/job/${jobName}/lastBuild/api/json`,
  };

  const response = await $Axios
    .get<JOBS_JSON_RESPONSE>(config.url)
    .then(function (response) {
      return { data: response.data };
    })
    .catch(function (error) {
      return { error: error };
    });
  return response;
};

const GetBuildStatus = async (
  jobName: string,
  jobNumber: number
): Promise<METHOD_API_RESPONSE<JOBS_JSON_RESPONSE>> => {
  const url = `${API_URL}/job/${jobName}/${jobNumber}/api/json`;
  const response = await $Axios
    .get<JOBS_JSON_RESPONSE>(url)
    .then((res) => {
      return { data: res.data };
    })
    .catch((err) => {
      return { error: err };
    });
  return response;
};

const GetLastSuccessfulBuild = async (
  jobName: string
): Promise<METHOD_API_RESPONSE<JOBS_JSON_RESPONSE>> => {
  const url = `${API_URL}/job/${jobName}/lastSuccessfulBuild/api/json`;
  const response = await $Axios
    .get<JOBS_JSON_RESPONSE>(url)
    .then((res) => {
      if (res.status === 200) {
        return { data: res.data };
      }
      return {
        error: {
          field: "error",
          message: "Something went wrong",
        },
      };
    })
    .catch((e) => {
      return { error: e };
    });
  return response;
};
// export * from './Frameworkup'
export {
  GetJenkinsCrumb,
  GetBuildConsoleText,
  GetLastBuildStatus,
  GetBuildStatus,
  GetLastSuccessfulBuild,
};
