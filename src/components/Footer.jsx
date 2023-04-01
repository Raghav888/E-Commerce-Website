import { useEffect, useState } from "react";
import { usePosition } from "../common/usePosition";
import styles from "../styles/Footer.module.css";

export const Footer = () => {
  const { latitude, longitude } = usePosition();
  const [temperature, setTemperature] = useState(0);
  const [address, setAddress] = useState("");

  const fetchWeather = async () => {
    try {
      let response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/today?unitGroup=metric&include=days&key=D32KVVAXE6QRG5K5BX25MBHX2&contentType=json`
      );
      response = await response.json();
      const temp = response?.days?.[0]?.temp || 0;
      setTemperature(temp);
    } catch (error) {
      setTemperature(0);
    }
  };

  const fetchAddress = async () => {
    try {
      let response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      response = await response.json();
      const currentAddress = response?.display_name || "";
      setAddress(currentAddress);
    } catch (error) {
      setAddress("");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
      fetchAddress();
    }
  }, [latitude, longitude]);

  return (
    <div className={styles.footer}>
      {!(latitude && longitude) ? (
        <>
          <div className={styles.addressError}>Geo Location not found</div>
        </>
      ) : (
        <>
          <div className={styles.address}>
            <div className={styles.addressHeader}>Current Address:</div>
            <div>{address}</div>
          </div>
          <div className={styles.temperature}>
            <span className={styles.temperatureHeader}>Temperature: </span>
            {temperature}&deg;C
          </div>
        </>
      )}
    </div>
  );
};
