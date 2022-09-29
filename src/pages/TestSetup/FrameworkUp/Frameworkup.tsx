import React, { SyntheticEvent, useEffect, useState } from "react";
import { Loader } from "../../../components/common";
import { Button, Checkbox, TextField } from "../../../components/FormComp";
import {
  DoubleGreaterThanIcon,
  DoubleLessThanIcon,
  GreaterThanIcon,
  LessThanIcon,
  UndoIcon,
} from "../../../components/Icons";
import { availablePluginsData, Jobs } from "../../../data";
import { CompareLastSuccessBuild } from "../../../helpers";
import { GetLastBuildStatus } from "../../../services";
import { RouterProps } from "../../../types";

const FrameworkUp = ({ history }: RouterProps) => {
  const frameworkInitialData = {
    elkStack: false,
    kibana: false,
    logstack: false,
    elasticSearch: false,
    grafanaStack: false,
    grafana: false,
    influxDb: false,
    telegraf: false,
    promethus: false,
    photonMasterIP: "",
    pluginJarLink: "",
  };
  const [frameWorkData, setFrameWorkData] = useState(frameworkInitialData);
  const [availablePlugins, setAvailablePlugins] =
    useState(availablePluginsData);
  const [selectedPlugins, setSelectedPlugins] = useState([]);
  const [operationDetails, setOperationDetails] = useState({
    operationName: "",
    oldAvailablePlugins: [],
    oldSelectedPlugins: [],
  });
  const [disableBuildBtn, setDisableBuildBtn] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  let interval: NodeJS.Timer;

  useEffect(() => {
    getLastBuildDatas();
    return () => clearInterval(interval);
  }, []);

  const getLastBuildDatas = async () => {
    setLoading(true);
    //check whether last build is still running or not
    interval = setInterval(async () => {
      const { data, error } = await GetLastBuildStatus(Jobs.FRAMEWORK_UP);
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
    const isDisable = await CompareLastSuccessBuild("FrameworkUp");
    setDisableBuildBtn(isDisable);
  };

  const selectedPluginsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    let filterSelectedPlugins = availablePlugins.filter(
      (plugin) => plugin.selected === true
    );

    const filterRemaningPlugins = availablePlugins.filter(
      (plugin) => plugin.selected === false
    );

    //reset selected to False
    filterSelectedPlugins.forEach((plugin) => (plugin.selected = false));

    setOperationDetails({
      operationName: "AvailableToSelected",
      oldAvailablePlugins: availablePlugins,
      oldSelectedPlugins: selectedPlugins,
    });
    setAvailablePlugins(filterRemaningPlugins);

    const copySelectedPlugins = [...selectedPlugins];
    setSelectedPlugins(copySelectedPlugins.concat(filterSelectedPlugins));
  };

  const allSelectedPluginsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const copySelectedplugins = [...selectedPlugins];
    let copyAvailablePlugin = [...availablePlugins];

    //reset to False
    copyAvailablePlugin.forEach((plugin) => (plugin.selected = false));
    setOperationDetails({
      operationName: "allAvailableToSelected",
      oldAvailablePlugins: availablePlugins,
      oldSelectedPlugins: selectedPlugins,
    });
    setSelectedPlugins(copyAvailablePlugin.concat(copySelectedplugins));
    setAvailablePlugins([]);
  };

  const deSelectedPluginsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const copyAvailablePlugin = [...availablePlugins];

    let filterSelectedPlugins = selectedPlugins.filter(
      (plugin) => plugin.selected === true
    );
    const remainingSelectedPlugins = selectedPlugins.filter(
      (plugin) => plugin.selected === false
    );
    filterSelectedPlugins.forEach((plugin) => (plugin.selected = false));

    setOperationDetails({
      operationName: "selectedToAvailable",
      oldAvailablePlugins: availablePlugins,
      oldSelectedPlugins: selectedPlugins,
    });
    setSelectedPlugins(remainingSelectedPlugins);
    setAvailablePlugins(copyAvailablePlugin.concat(filterSelectedPlugins));
  };

  const allDeSelectedPluginsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const copyAvailablePlugin = [...availablePlugins];
    let copySelectedPlugins = [...selectedPlugins];

    //reset to False
    copySelectedPlugins.forEach((plugin) => (plugin.selected = false));

    setOperationDetails({
      operationName: "selectedToAvailable",
      oldAvailablePlugins: availablePlugins,
      oldSelectedPlugins: selectedPlugins,
    });
    setSelectedPlugins([]);
    setAvailablePlugins(copyAvailablePlugin.concat(copySelectedPlugins));
  };

  const undoPluginsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (operationDetails.operationName) {
      setAvailablePlugins(operationDetails.oldAvailablePlugins);
      setSelectedPlugins(operationDetails.oldSelectedPlugins);
      setOperationDetails({
        operationName: "",
        oldAvailablePlugins: [],
        oldSelectedPlugins: [],
      });
    }
  };

  const actionButtons = [
    {
      title: "",
      icon: <GreaterThanIcon />,
      handler: (e: SyntheticEvent) => selectedPluginsHandler(e),
    },
    {
      title: "",
      icon: <DoubleGreaterThanIcon />,
      handler: (e: SyntheticEvent) => allSelectedPluginsHandler(e),
    },
    {
      title: "",
      icon: <LessThanIcon />,
      handler: (e: SyntheticEvent) => deSelectedPluginsHandler(e),
    },
    {
      title: "",
      icon: <DoubleLessThanIcon />,
      handler: (e: SyntheticEvent) => allDeSelectedPluginsHandler(e),
    },
    {
      title: "Undo",
      icon: <UndoIcon />,
      handler: (e: SyntheticEvent) => undoPluginsHandler(e),
    },
  ];

  return (
    <div className={`w-full h-full p-5 overflow-y-auto`}>
      <div className="flex justify-between">
        <div className="font-equipE font-medium text-2xxl text-blue-900">
          Framework up
        </div>
        <div className="flex items-center">
          <div className="rounded-xl text-blue-100">
            <label className="font-inter text-sm font-normal">
              Photon Master IP:
            </label>
            <TextField
              name="photonMasterIP"
              value={frameWorkData.photonMasterIP}
              onInput={(value) => {
                setFrameWorkData({ ...frameWorkData, photonMasterIP: value });
              }}
            />
          </div>
          <div className="ml-4">
            <Button
              title="Build Now"
              disabled={disableBuildBtn}
              onClick={() => history.push("/test-setup/framework-up/build")}
            ></Button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <form className="flex flex-col">
          <div className="w-full flex">
            <div className="bg-white rounded-xl p-4 w-5/12">
              <div className="font-equipE font-normal text-lg text-blue-900">
                Services
              </div>
              <div className="pt-2 flex lg:flex-row md:flex-col  text-blue-100 font-inter w-full">
                <div className="mr-2 text-xs bg-neutrals-300 p-2 rounded h-51 md:w-full lg:w-1/2">
                  <Checkbox
                    name="elkStack"
                    label="ELK Stack"
                    value={frameWorkData.elkStack}
                    onSelect={(value) => {
                      if (value) {
                        setFrameWorkData({ ...frameWorkData, elkStack: value });
                      } else {
                        setFrameWorkData({
                          ...frameWorkData,
                          elkStack: value,
                          kibana: false,
                          logstack: false,
                          elasticSearch: false,
                        });
                      }
                    }}
                  />
                  <div className="flex flex-col pl-3">
                    <div className="pt-3">
                      <Checkbox
                        name="kibana"
                        label="Kibana"
                        disabled={!frameWorkData.elkStack}
                        value={frameWorkData.kibana}
                        onSelect={(value) =>
                          setFrameWorkData({ ...frameWorkData, kibana: value })
                        }
                      />
                    </div>
                    <div className="pt-3">
                      <Checkbox
                        name="logstash"
                        label="Logstash"
                        disabled={!frameWorkData.elkStack}
                        value={frameWorkData.logstack}
                        onSelect={(value) =>
                          setFrameWorkData({
                            ...frameWorkData,
                            logstack: value,
                          })
                        }
                      />
                    </div>
                    <div className="pt-3">
                      <Checkbox
                        name="elasticSearch"
                        label="Elastic search"
                        disabled={!frameWorkData.elkStack}
                        value={frameWorkData.elasticSearch}
                        onSelect={(value) =>
                          setFrameWorkData({
                            ...frameWorkData,
                            elasticSearch: value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-xs bg-neutrals-300 p-2 rounded md:w-full lg:w-1/2">
                  <Checkbox
                    name="grafanaStack"
                    label="Grafana Stack"
                    value={frameWorkData.grafanaStack}
                    onSelect={(value) => {
                      if (value) {
                        setFrameWorkData({
                          ...frameWorkData,
                          grafanaStack: value,
                        });
                      } else {
                        setFrameWorkData({
                          ...frameWorkData,
                          grafanaStack: value,
                          grafana: false,
                          influxDb: false,
                          telegraf: false,
                          promethus: false,
                        });
                      }
                    }}
                  />
                  <div className="flex flex-col pl-3 ">
                    <div className="pt-3">
                      <Checkbox
                        name="grafana"
                        label="Grafana"
                        value={frameWorkData.grafana}
                        disabled={!frameWorkData.grafanaStack}
                        onSelect={(value) =>
                          setFrameWorkData({ ...frameWorkData, grafana: value })
                        }
                      />
                    </div>
                    <div className="pt-3">
                      <Checkbox
                        name="influxDB"
                        label="Influx DB"
                        value={frameWorkData.influxDb}
                        disabled={!frameWorkData.grafanaStack}
                        onSelect={(value) =>
                          setFrameWorkData({
                            ...frameWorkData,
                            influxDb: value,
                          })
                        }
                      />
                    </div>
                    <div className="pt-3">
                      <Checkbox
                        name="telegraf"
                        label="Telegraf"
                        value={frameWorkData.telegraf}
                        disabled={!frameWorkData.grafanaStack}
                        onSelect={(value) =>
                          setFrameWorkData({
                            ...frameWorkData,
                            telegraf: value,
                          })
                        }
                      />
                    </div>
                    <div className="pt-3">
                      <Checkbox
                        name="promethus"
                        label="Promethus"
                        value={frameWorkData.promethus}
                        disabled={!frameWorkData.grafanaStack}
                        onSelect={(value) =>
                          setFrameWorkData({
                            ...frameWorkData,
                            promethus: value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 ml-4 w-7/12">
              <div className="font-equipE font-normal text-lg text-blue-900">
                Plugins
              </div>
              <div className="flex pt-2 text-blue-100">
                <div className="w-2/3">
                  <div className="text-xs mb-2 font-inter">
                    Available Plugins
                  </div>
                  <div className="flex lg:flex-row">
                    <div className="p-2 border border-neutrals-300 rounded w-full h-44 overflow-y-auto available-plugin bg-neutrals-300">
                      {availablePlugins.map((plugin, index) => {
                        return (
                          <div key={index} className="text-xs font-inter py-1">
                            <Checkbox
                              name={plugin.name}
                              label={plugin.name}
                              value={plugin.selected}
                              onSelect={(value) => {
                                const copyAvailablePlugin = [
                                  ...availablePlugins,
                                ];
                                copyAvailablePlugin[index].selected = value;
                                setAvailablePlugins(copyAvailablePlugin);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="mx-1">
                      {actionButtons.map((btn, key) => {
                        return (
                          <button
                            key={key}
                            type="button"
                            className={`mb-1 border border-neutrals-400 w-11 h-8 flex justify-center items-center rounded text-blue-900 ${
                              btn.title === "Undo"
                                ? "bg-blue-900 text-white"
                                : "text-blue-900"
                            }`}
                            onClick={(e) => btn.handler(e)}
                            title={btn.title}
                          >
                            {btn.icon}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 text-blue-100">
                  <div className="text-xs mb-2 font-inter">
                    Selected Plugins
                  </div>
                  <div className="p-2 border border-neutrals-300 rounded h-44 bg-neutrals-300 overflow-y-auto available-plugin">
                    {selectedPlugins.map((plugin, index) => {
                      return (
                        <div key={index} className="text-xs font-inter py-1">
                          <Checkbox
                            name={plugin.name}
                            label={plugin.name}
                            value={plugin.selected}
                            onSelect={(value) => {
                              const copySelectedplugins = [...selectedPlugins];
                              copySelectedplugins[index].selected = value;
                              setSelectedPlugins(copySelectedplugins);
                            }}
                          ></Checkbox>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-white p-4">
            <div className="font-equipE font-normal text-lg text-blue-900 mb-2">
              Additional Plugins_Jar_Link
            </div>
            <div className="font-inter text-xs text-blue-100">
              <p>
                Enter all other links of plugin that are required to download
              </p>
              <textarea
                name="pluginJarLink"
                className="p-2 border border-neutrals-400 w-full rounded mt-2 resize-none focus-visible:outline-neutrals-400"
                rows={10}
                placeholder="Example: https://abc.com"
              />
            </div>
          </div>
        </form>
      </div>
      {loading && (
        <div className="text-blue-900">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default FrameworkUp;
export { FrameworkUp };
