import React from "react";

import { FiWind } from "react-icons/fi";

function FiveDayForecast({ items, title, changeChosenDay }) {
  return (
    <div className="max-w-[1240px] m-auto bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl px-3 py-2 mt-5">
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase text-xs md:text-md">
          {title}
        </p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col gap-3 md:flex-row items-center justify-between text-white ">
        {items.map((item) => (
          <div
            key={item.dt}
            className="flex flex-row w-full gap-5 items-center justify-between py-2 px-3 md:flex-col  rounded-xl bg-[#226cb6] bg-opacity-20 hover:cursor-pointer hover:bg-[#226cb6] "
            onClick={() => changeChosenDay(item.date)}
          >
            <p className="font-bold text-md">
              {item.day === new Date().getDate()
                ? "Today"
                : item.day_of_the_week}
            </p>
            <p className="font-medium text-2xl  md:mt-2">
              {Math.floor(item.temp_average)}°
            </p>
            <div className="flex flex-col md:flex-col h-full items-start justify-start p-2 shadow-gray-50 rounded-xl">
              <div className="flex items-center justify-start flex-col md:flex-row gap-1">
                <div className="flex flex-row justify-between items-center">
                  <FiWind />
                  <p className="text-white font-medium ml-2">Wind:</p>
                </div>
                <p>{Math.floor(item.wind_average)} km/h</p>
              </div>
            </div>
            <div className="flex justify-center items-center relative">
              <div className="flex justify-center items-center relative px-2">
                <p className="text-md">{Math.floor(item.temp_min_daily)}°</p>
                <p className="mx-2">|</p>
                <p className="text-md">{Math.floor(item.temp_max_daily)}°</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiveDayForecast;
