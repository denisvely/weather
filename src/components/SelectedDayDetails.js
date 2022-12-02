import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FiWind } from 'react-icons/fi';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';

import { getIconUrlFromCode } from '../utils/helpers.js';
import { metersToKm } from '../utils/helpers';

function SelectedDayDetails({ items, city, chosenDate }) {
  const [currentForecast, setCurrentForecast] = useState(null);

  useEffect(() => {
    if (chosenDate) {
      items.map((dailyData) => {
        if (chosenDate === dailyData.date) {
          setCurrentForecast(dailyData);
        }
      });
    }
  }, [chosenDate, items]);

  return currentForecast ? (
    <div className="flex justify-center gap-10 items-center flex-col max-w-[1240px] m-auto">
      <div className="flex justify-center items-center flex-col">
        <p>{moment(currentForecast.dt_txt).format('LL')}</p>
        <h2 data-testid="searchedCity" className="text-3xl capitalize">
          {city}
        </h2>
        <div className="flex justify-center items-center relative px-4">
          <h1 className="text-8xl">{Math.floor(currentForecast.day === new Date().getDate() ? currentForecast.main.temp : currentForecast.temp_average)}</h1>
          <p className="text-5xl absolute top-0 right-0">&#176;</p>
        </div>
        <img src={getIconUrlFromCode(currentForecast.weather[0].icon)} alt="" className="w-20" />
        <div className="flex justify-center items-center relative">
          <div className="flex justify-center items-center relative px-2">
            <h1 className="text-xl">L: {Math.floor(currentForecast.temp_min_daily)}</h1>
            <p className="text-xl absolute top-0 right-0">&#176;</p>
          </div>
          <div className="flex justify-center items-center relative px-2">
            <h1 className="text-xl">H: {Math.floor(currentForecast.temp_max_daily)}</h1>
            <p className="text-xl absolute top-0 right-0">°</p>
          </div>
        </div>
        <div className="flex items-center justify-between"></div>
      </div>

      <div className="flex w-full flex-col md:flex-row items-center justify-center gap-2">
        <div className="flex w-full h-full items-start justify-start flex-col px-5 py-2 md:py-5 bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl">
          <div className="flex items-center justify-start flex-row gap-1">
            <CiTempHigh />
            <p className="text-white font-medium">Feels like:</p>
            <p>{parseInt(currentForecast.main.feels_like)}°</p>
          </div>
        </div>
        <div className="flex w-full h-full items-start justify-start flex-col px-5 py-2 md:py-5 bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl">
          <div className="flex items-center justify-start flex-row gap-1">
            <WiHumidity />
            <p className="text-white font-medium">Humidity:</p>
            <p className="font-semibold">{parseInt(currentForecast.main.humidity)}%</p>
          </div>
        </div>
        <div className="flex w-full h-full items-start justify-start flex-col px-5 py-2 md:py-5 bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl">
          <div className="flex items-center justify-start flex-row gap-1">
            <FiWind />
            <p className="text-white font-medium">Wind:</p>
            <p className="font-semibold">{parseInt(currentForecast.wind.speed)} km/h</p>
          </div>
        </div>
        <div className="flex w-full h-full items-start justify-start flex-col px-5 py-2 md:py-5 bg-[#226cb6] bg-opacity-20 shadow-gray-50 rounded-xl">
          <div className="flex items-center justify-start flex-row gap-1">
            <MdVisibility />
            <p className="text-white font-medium">Visibility:</p>
            <p className="font-semibold">{metersToKm(currentForecast.visibility)} km</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

SelectedDayDetails.propTypes = {
  items: PropTypes.array,
  city: PropTypes.string,
  chosenDate: PropTypes.string
};

export default SelectedDayDetails;
