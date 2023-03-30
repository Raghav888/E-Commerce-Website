import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

export const Footer = () => {
  const [temperature, setTemperature] = useState();

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/delhi/today?unitGroup=metric&include=days&key=D32KVVAXE6QRG5K5BX25MBHX2&contentType=json"
      );
      response = await response.json();
      let temp = response?.days[0]?.temp;
      setTemperature(temp);
    })();
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.addressTab}>
        <div className={styles.head}>
          <h1>Address:</h1>
        </div>
        <div className={styles.address}>
          <h2>Near XYZ, ABC Road,</h2>
          <h2>Infront of Y Building, Delhi, India.</h2>
        </div>
      </div>
      <div className={styles.temperature}>
        <div className={styles.head}>
          <h1>Live Temperature of Delhi:</h1>
        </div>
        <div className={styles.address}>
          <h2>{temperature}&deg;C</h2>
        </div>
      </div>
    </div>
  );
};
