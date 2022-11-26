import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Loader from '../components/Loader';
import Inputs from '../components/Inputs';
import SelectedDayDetails from '../components/SelectedDayDetails';
import FiveDayForecast from '../components/FiveDayForecast';
import HourlyForecast from '../components/HourlyForecast.js';

import { getFormattedData } from '../services/weatherService';

function Overview() {
  const [searchParams, setSearchParams] = useState({ q: 'sofia' });
  const [weather, setWeather] = useState(null);
  const [chosenDate, setChosenDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormattedData({ ...searchParams }).then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setError(null);
          setWeather(data);
        }
      });
    };
    fetchWeatherData();
  }, [searchParams]);

  return weather && chosenDate ? (
    <div className="w-full h-full min-h-[100vh] p-5 bg-gradient-to-b from-[#6782B4] to-[#B1BFD8]">
      <Inputs setSearchParams={setSearchParams} setChosenDate={setChosenDate} />
      {error ? (
        <div className="flex justify-center items-center flex-col">
          <h3 className="capitalize text-3xl mb-2">{error}</h3>
          <h3>Please try again!</h3>
        </div>
      ) : (
        <>
          <SelectedDayDetails
            items={weather.forecastDataDaily}
            city={searchParams.q}
            chosenDate={chosenDate}
          />
          <HourlyForecast
            items={
              weather.forecastDataHourly[chosenDate]
                ? weather.forecastDataHourly[chosenDate]
                : weather.forecastDataHourly[chosenDate + 1]
            }
            title="Hourly Forecast"
            chosenDate={chosenDate}
          />
          <FiveDayForecast
            items={weather.forecastDataDaily}
            title="Daily Forecast"
            changeChosenDay={(day) => setChosenDate(day)}
          />
        </>
      )}
    </div>
  ) : (
    <Loader />
  );
}

export default Overview;
