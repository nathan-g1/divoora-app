import React from 'react';
import useGeolocation from '../hooks/geolocation';
import { atom, useSetRecoilState } from 'recoil';

export const locationAtom = atom({
  key: 'userLocation',
  default: {
    loaded: false,
    latitude: 0,
    longitude: 0,
  },
});

const LandingPage: React.FC = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/search';
  const location = useGeolocation();

  // Store users current location
  const setUserLocation = useSetRecoilState(locationAtom);
  setUserLocation(location);
  
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Show current user location */}

      <div className="flex text-2xl font-semibold py-3">
        {location.loaded && (location.longitude !== 0) ?  `Longitude: ${location.longitude} : Latitude: ${location.latitude}` : 'Requesting location...'}
      </div>
      <div className="flex">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirectUri}`}
          className="text-white block text-center bg-primary w-40 py-4 rounded-[5px] text-base font-bold font-sans hover:bg-gray-700"
        >
          Login to App
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
