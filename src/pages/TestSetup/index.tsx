import React, { useEffect } from "react";
import { testSetupJobs } from "../../data";
import { ArrowDownGreen } from "../../components/Icons";
import { CardWrapper } from "../../components/layouts";
import Axios from "axios";
import $Axios from "../../lib/axios";
interface testSetupProps {
  activeStatus: boolean;
}

const TestSetup = ({ activeStatus }: testSetupProps) => {
  useEffect(() => {
    // let formData = new FormData();
    // formData.append("name", " AvailableServices");
    // formData.append("AvailableServices.value", " Grafana");
    // formData.append("AvailableServices.value", " InfluxDB");
    // formData.append("AvailableServices.value", " Telegraf");
    // formData.append("name", " DownloadPlugins");
    // formData.append("DownloadPlugins.value", " Custom Thread Group");
    // formData.append("DownloadPlugins.value", " Custom Jmeter Functions");
    // formData.append("name", " Plugin_Jars_Link");
    // formData.append("value", " ");
    // formData.append("statusCode", " 303");
    // formData.append("redirectTo", " .");
    // formData.append(
    //   "Jenkins-Crumb",
    //   " a80b78a54074cfb964666e76244a565ef32b2e8f3b35e9963404f54de1cf474d"
    // );
    // formData.append(
    //   "json",
    //   ' {"parameter": [{"name": "AvailableServices", "value": ["Grafana", "InfluxDB", "Telegraf"]}, {"name": "DownloadPlugins", "value": ["Custom Thread Group", "Custom Jmeter Functions"]}, {"name": "Plugin_Jars_Link", "value": ""}], "statusCode": "303", "redirectTo": ".", "Jenkins-Crumb": "a80b78a54074cfb964666e76244a565ef32b2e8f3b35e9963404f54de1cf474d"}'
    // );
    // formData.append("Submit", " Build");

    var config = {
      method: "Post",
      url: "http://54.225.238.212:8080/job/PHOTON_Framework_Down/build",
      headers: {
        "Jenkins-Crumb": localStorage.getItem("crumb"),
        Authorization: "Basic cGhvdG9uOnBob3Rvbg==",
        Cookie: "JSESSIONID.9bc6d67f=node0i1nogy9xnruh1b483rhj7ddsy61.node0",
        "Access-Control-Allow-Origin": "*",
      },
    };

    $Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // var myHeaders = new Headers();
    // myHeaders.append(
    //   "Jenkins-Crumb",
    //   "a8a343010ef7c4205f499f94b6746a7e8752db1db161751b98c9c1edba57b0e9"
    // );
    // myHeaders.append("Authorization", "Basic cGhvdG9uOnBob3Rvbg==");
    // myHeaders.append(
    //   "Cookie",
    //   "JSESSIONID.9bc6d67f=node0173zkf72pkuho3t9ya7v62id66.node0"
    // );

    // fetch("http://54.225.238.212:8080/job/PHOTON_Framework_Down/build", {
    //   method: "POST",
    //   headers: myHeaders,
    //   mode: "no-cors",
    //   credentials: "omit",
    // })
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto py-4 ${
        !activeStatus ? "px-4" : "px-32"
      }`}
    >
      <div className="flex flex-col">
        <div className="font-medium font-equipE text-2xxl text-blue-900">
          Test Setup
        </div>
        {/* grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-2 */}
        <div className="flex flex-row flex-wrap mt-2">
          {testSetupJobs.map((data, index) => {
            return (
              <CardWrapper key={index}>
                <div className="bg-neutrals-800 h-31 rounded-xl">
                  {data.image}
                </div>
                <div className="text-lg font-medium px-2 pt-2">{data.name}</div>
                <div className="text-sm px-2">{data.desc}</div>
                <div
                  className="cursor-pointer text-xl text-green-400 font-medium flex justify-end items-center pt-8 pr-2 "
                  // onClick={() => history.push(menu.url)}
                >
                  Go
                  <span className="flex pl-2 pb-1">
                    <ArrowDownGreen />
                  </span>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestSetup;
export { TestSetup };
