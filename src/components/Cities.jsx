/* eslint-disable react/prop-types */
import { useCities } from "../contexts/CitiesContext";
import styles from "./Cities.module.css";
import City from "./City";
import Message from "./Message";
// eslint-disable-next-line react/prop-types
function Cities() {
  const { cities } = useCities();

  return (
    <div className={styles.container}>
      {cities.length === 0 ? (
        <Message>
          Sorry there is no cities added yet, please add a city 😍
        </Message>
      ) : (
        cities.map((city) => (
          <City
            key={city.id}
            keyProp={city.id}
            name={city.name}
            flag={city.countryCode}
            date={city.date}
            lat={city.lat}
            lng={city.lng}
          />
        ))
      )}
    </div>
  );
}

export default Cities;
