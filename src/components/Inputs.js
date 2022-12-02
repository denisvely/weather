import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { MdFavoriteBorder } from 'react-icons/md';
import { getLocationData } from '../services/locationService';

function Inputs({ setSearchParams }) {
  console.log('inputs');
  const initialFavorites = useMemo(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }, []);
  const [city, setCity] = useState('');
  const [favorites, setFavorites] = useState(initialFavorites);

  const searchByCity = () => {
    if (city !== '') {
      setSearchParams({ q: city });
      setCity('');
    }
  };

  const searchByLocation = async () => {
    const cityParam = await getLocationData();
    setSearchParams(cityParam);
  };

  const setFavs = () => {
    if (!city) return;

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (!localFavorites) {
      localStorage.setItem('favorites', JSON.stringify([city]));
      setFavorites([city]);
    } else {
      if (localFavorites.indexOf(city) > -1) {
        alert(`${city} is Already in Favorites`);
        return;
      }
      localStorage.setItem('favorites', JSON.stringify([...localFavorites, city]));
      setFavorites((prevState) => [...prevState, city]);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="Search for a city"
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none rounder text-gray-600 rounded-xl"
          />
          <div className="hover:scale-110 hover:cursor-pointer" onClick={searchByCity}>
            <AiOutlineSearch fontSize="25" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer" onClick={searchByLocation}>
            <CiLocationOn fontSize="25" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer" onClick={setFavs}>
            <MdFavoriteBorder fontSize="25" />
          </div>
        </div>
      </div>
      <div className="m-auto bg-[#226cb6] w-3/4 bg-opacity-20 shadow-gray-50 rounded-xl px-3 py-2 mb-5">
        <div className="flex items-center justify-start">
          <p className="text-white font-medium uppercase text-xs md:text-md">Favorites</p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row justify-start space-x-4 m-auto">
          {favorites.length > 0 &&
            favorites.map((item) => (
              <div className="hover:scale-110 hover:cursor-pointer" key={item} onClick={() => setSearchParams({ q: item })}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

Inputs.propTypes = {
  setSearchParams: PropTypes.func,
  setChosenDate: PropTypes.func
};

export default Inputs;
