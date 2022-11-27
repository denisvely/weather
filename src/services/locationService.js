export const getLocationData = async () => {
  return fetch('https://ipapi.co/json')
    .then((data) => data.json())
    .then((response) => {
      return { q: response.city };
    })
    .catch((err) => {
      console.log(err);
      return { q: 'sofia' };
    });
};
