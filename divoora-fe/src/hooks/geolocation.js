import React, { useEffect } from 'react'

const useGeolocation = () => {
    const [position, setPosition] = React.useState({
        loaded: false,
        latitude: 0,
        longitude: 0,
    });

    const onError = (error) => {
        setPosition({
            loaded: true,
            latitude: 0,
            longitude: 0,
        });
    };

    const onSuccess = (position) => {
        setPosition({
            loaded: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            onError();
        }
    }, []);

    return position;
}

export default useGeolocation;
