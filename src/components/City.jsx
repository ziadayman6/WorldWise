/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";

function onDelete(name, cities) {
  const newCities = cities.filter(
    (city) => city.name.toLowerCase() !== name.toLowerCase()
  );

  return newCities;
}

function City({ keyProp, name, flag, date, lat, lng }) {
  const { cities, currentCity, dispatch } = useCities();

  const details = `../${keyProp}?lat=${lat}&lng=${lng}`;

  return (
    <div
      className={`${styles.container} ${
        currentCity === keyProp ? styles.currentContainer : ""
      }`}
    >
      <div className={styles.left}>
        <div className={styles.country}>{flag}</div>
        <div className={styles.details}>
          <p>{name}</p>
          <Link
            to={details}
            onClick={() => {
              dispatch({ type: "setCurrentCity", payload: keyProp });
            }}
          >
            VIEW DETAILS <span>&rarr;</span>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <p>({date})</p>
        <button
          onClick={() =>
            dispatch({ type: "setCities", payload: onDelete(name, cities) })
          }
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default City;
