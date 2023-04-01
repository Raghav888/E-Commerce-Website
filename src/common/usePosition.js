import { useState, useEffect } from "react";

export const usePosition = () => {
  const errorMessage = "Geolocation is not supported";
  const defaultCoord = {
    latitude: 0,
    longitude: 0,
  };
  const [position, setPosition] = useState(defaultCoord);

  const onSuccess = ({ coords }) => {
    setPosition({
      latitude: coords.latitude ?? 0,
      longitude: coords.longitude ?? 0,
    });
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      return;
    }

    const watcher = geo.watchPosition(onSuccess);

    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position };
};
