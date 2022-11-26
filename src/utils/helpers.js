export const metersToKm = (value) => {
  if (!value) return;
  return value / 1000;
};
export const getIconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;
export const getWeekDayName = (date) => {
  let day = date.toLocaleString("en-GB", { weekday: "short" });
  return day;
};
