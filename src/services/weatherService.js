import moment from 'moment';
import { getWeekDayName } from '../utils/helpers';

const API_KEY = '2f69ea4bc882c7a2b2b3386eaadfc4c8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherData = async (searchParams) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    ...searchParams,
    units: 'metric',
    appid: API_KEY
  });

  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getFormattedData = async (searchParams) => {
  const data = await getWeatherData(searchParams);

  if (data.cod === '404') {
    return { error: true, message: data.message };
  }

  const forecastDataHourly = await formatForecastDataHourly(data?.list);

  const forecastDataDaily = formatForecastDataDaily(forecastDataHourly);

  return { forecastDataDaily, forecastDataHourly };
};

const formatForecastDataHourly = async (data) => {
  let hourlyData = {};

  data.map((item) => {
    const day = new Date(item.dt_txt).getDate();
    const date = item.dt_txt.split(' ')[0];
    if (!hourlyData[date]) hourlyData[date] = [];
    hourlyData[date].push({ ...item, day });
    return;
  });

  return hourlyData;
};

const formatForecastDataDaily = (data) => {
  const averageDailyData = [];

  Object.values(data).map((dayData) => {
    const temp_max_daily = dayData.reduce((acc, item) => {
      if (item.main.temp_max > acc) acc = item.main.temp_max;

      return Math.round(acc);
    }, 0);

    const temp_min_daily = dayData.reduce((acc, item) => {
      if (item.main.temp_min < acc) acc = item.main.temp_min;

      return Math.round(acc);
    }, 0);

    const wind_average =
      dayData.reduce((acc, item) => {
        acc += item.wind.speed;
        return Math.round(acc);
      }, 0) / dayData.length;

    const temp_average =
      dayData.reduce((acc, item) => {
        acc += item.main.temp;

        return Math.round(acc);
      }, 0) / dayData.length;

    const day_of_the_week = getWeekDayName(new Date(dayData[0].dt_txt));

    const summarizedDailyData = {
      temp_average,
      temp_max_daily,
      temp_min_daily,
      wind_average,
      day_of_the_week,
      date: moment(dayData[0].dt_txt).format('YYYY-MM-DD'),
      ...dayData[0]
    };

    if (averageDailyData.length === 5) {
      return;
    }

    averageDailyData.push(summarizedDailyData);
  });

  return averageDailyData;
};
