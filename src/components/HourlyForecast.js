import React from "react";
import moment from "moment";

import { getIconUrlFromCode } from "../utils/helpers";

function HourlyForecast({ items, chosenDay, title }) {
  return (
    <div className="max-w-[1240px] m-auto bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl px-3 py-2 mt-5">
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase text-xs md:text-md">
          {title} for {moment(items[0].dt_txt).format("LL")}
        </p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white overflow-y-scroll pb-3 md:overflow-auto">
        {items.map((item) => {
          return chosenDay === item.date ? (
            <div
              key={item.dt}
              className="flex flex-col items-center justify-center py-2 px-3 rounded-xl"
            >
              <p className="font-bold text-md">
                {moment(item.dt_txt).format("HH:mm")}
              </p>
              <img
                src={getIconUrlFromCode(item.weather[0].icon)}
                alt=""
                className="w-10"
              />
              <p className="font-medium text-2xl mt-2">
                {parseInt(item.main.temp)}°
              </p>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
