/* eslint-disable react/prop-types */
import { useCities } from "../contexts/CitiesContext";
import styles from "./Countries.module.css";
import Country from "./Country";
import Message from "./Message";

function Countries() {
  const { countries } = useCities();
  return (
    <div className={styles.container}>
      {countries.length === 0 ? <Message> Sorry there is no cities added yet, please add a city 😍</Message> : countries.map((country) => (
        <Country
          key={country.country}
          country={country.countryCode}
          citiesVisited={country.citiesVisited}
        />
      ))}
    </div>
  );
}

export default Countries;
