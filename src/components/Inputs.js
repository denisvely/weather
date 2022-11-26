import React, { useState } from 'react';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';

import { getLocationData } from '../services/locationService';

function Inputs({ setSearchParams, setChosenDate }) {
  const [city, setCity] = useState('');

  const searchByCity = () => {
    if (city !== '') {
      setChosenDate(moment(new Date()).format('YYYY-MM-DD'));
      setSearchParams({ q: city.trim() });
      setCity('');
    }
  };

  const searchByLocation = async () => {
    const cityParam = await getLocationData();
    setSearchParams(cityParam);
  };

  return (
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
      </div>
    </div>
  );
}

export default Inputs;
