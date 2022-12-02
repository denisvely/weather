import { data } from 'autoprefixer';

export const metersToKm = (value) => {
  if (!value) return;
  return value / 1000;
};

export const getIconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export const getWeekDayName = (date) => {
  let day = date.toLocaleString('en-GB', { weekday: 'short' });
  return day;
};

export const findMaxTemp = (data) => {
  return Math.max(...data.map((item) => item.main.temp_max));
};

export const findMinTemp = (data) => {
  return Math.min(...data.map((item) => item.main.temp_min));
};
