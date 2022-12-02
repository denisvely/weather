import React, { useState } from 'react';

import Inputs from '../components/Inputs';
import ForecastMain from '../components/ForecastMain';

function Overview() {
  const [searchParams, setSearchParams] = useState({ q: 'sofia' });

  return (
    <div className="w-full h-full min-h-[100vh] p-5 bg-gradient-to-b from-[#6782B4] to-[#B1BFD8]">
      <Inputs setSearchParams={setSearchParams} />
      <ForecastMain searchParams={searchParams} />
    </div>
  );
}

export default Overview;
