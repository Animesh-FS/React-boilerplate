import React from "react";
import TopBanner from "../../../public/image/TopBanner.png";
import { dashboardCardMenu } from "../../data";
import { ArrowDownGreen } from "../../components/Icons";
const DashBoardPage = ({ history }) => {
  return (
    <div className=" w-full py-4 px-28 flex flex-col overflow-y-auto ">
      <div className="relative">
        <img src={TopBanner} className="w-full h-full" />
        <div className="absolute top-0 left-4">
          <div className=" text-green-400 pt-6">
            End-to-end performance testing solution
          </div>
          <div className="text-white text-5xl font-medium font-equipE">
            PHOTON
          </div>
          <div className="py-4 text-sm text-white flex flex-wrap w-full font-equipE">
            <div className="w-3/5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              pretium, nec vitae at. Ac habitant enim aliquam mattis eu, rhoncus
              tortor nibh imperdiet. Eu tincidunt scelerisque sed lectus nisl
              dignissim vitae mauris. Purus maecenas quam tellus ut elit, tempus
              at tincidunt. Sollicitudin sed viverra ultrices varius ullamcorper
              malesuada. Varius consectetur arcu mauris porttitor id sed tempus
              sollicitudin egestas. Eget adipiscing risus aliquet at nunc.
              Consequat.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        {dashboardCardMenu.map((menu, index) => {
          return (
            <div
              key={index}
              className="bg-white w-92 p-2 rounded-xl flex flex-col h-76 relative m-1"
            >
              <div className="bg-neutrals-800 h-31 rounded-xl">
                {menu.image}
              </div>
              <div className="text-lg font-medium px-2 pt-2">{menu.title}</div>
              <div className="text-sm px-2 font-equipE">{menu.desc}</div>
              <div
                className="cursor-pointer text-xl text-green-400 font-medium flex justify-end items-center pt-8 pr-2 "
                onClick={() => history.push(menu.url)}
              >
                Go
                <span className="flex pl-2 pb-1">
                  <ArrowDownGreen />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardPage;
export { DashBoardPage };
