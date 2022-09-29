import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import {
  DashBoardPage,
  TestSetup,
  FrameworkUp,
  FrameworkupBuild,
  FrameworkDown,
} from "../pages";
import Sidebar from "../components/Sidebar";
import SidebarCollapser from "../components/Sidebar/SidebarCollapser";
const RouterLayout = ({}) => {
  const [sideMenuCollapse, setSideMenuCollapse] = useState(false);
  const sideMenuCollapseHandler = () => {
    setSideMenuCollapse(!sideMenuCollapse);
  };
  return (
    <>
      <Header />
      <div className="flex flex-row main-container">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <DashBoardPage {...routeProps} />}
          />
          <>
            <Sidebar activeStatus={sideMenuCollapse} />
            <div
              className={`relative overflow-hidden ${
                !sideMenuCollapse ? "main-section" : "w-full"
              }`}
            >
              <Route
                path="/test-setup"
                exact
                render={(routeProps) => (
                  <TestSetup activeStatus={sideMenuCollapse} {...routeProps} />
                )}
              />
              <Route
                path="/test-setup/framework-up"
                exact
                render={(routeProps) => <FrameworkUp {...routeProps} />}
              />
              <Route
                path="/test-setup/framework-up/build"
                render={(routeProps) => <FrameworkupBuild {...routeProps} />}
              />
              <Route
                path="/test-setup/framework-down"
                render={(routeProps) => <FrameworkDown {...routeProps} />}
              />
              {/* sidebar Collapse button */}
              <SidebarCollapser
                activeStatus={sideMenuCollapse}
                collapseHandler={sideMenuCollapseHandler}
              />
            </div>
          </>
        </Switch>
      </div>
    </>
  );
};

export default RouterLayout;
