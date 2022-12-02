import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Loader from './Loader';
import HourlyForecast from './HourlyForecast';
import FiveDayForecast from './FiveDayForecast';
import SelectedDayDetails from './SelectedDayDetails';

import { getFormattedData } from '../services/weatherService';

function ForecastMain({ searchParams }) {
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
    setChosenDate(moment(new Date()).format('YYYY-MM-DD'));
  }, [searchParams]);

  return weather && chosenDate ? (
    error ? (
      <div className="flex justify-center items-center flex-col">
        <h3 className="capitalize text-3xl mb-2">{error}</h3>
        <h3>Please try again!</h3>
      </div>
    ) : (
      <>
        <SelectedDayDetails items={weather.forecastDataDaily} city={searchParams.q} chosenDate={chosenDate} />
        <HourlyForecast
          items={weather.forecastDataHourly[chosenDate] ? weather.forecastDataHourly[chosenDate] : weather.forecastDataHourly[chosenDate + 1]}
          title="Hourly Forecast"
          chosenDate={chosenDate}
        />
        <FiveDayForecast items={weather.forecastDataDaily} title="Daily Forecast" changeChosenDay={(day) => setChosenDate(day)} />
      </>
    )
  ) : (
    <Loader />
  );
}

ForecastMain.propTypes = {
  searchParams: PropTypes.object
};

export default ForecastMain;
