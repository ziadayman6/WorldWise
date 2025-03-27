/* eslint-disable react/prop-types */
import styles from "./Country.module.css";

function Country({ country, citiesVisited }) {
  return (
    <div className={styles.container}>
      <p className={styles.header}>{country}</p>
      <p>{citiesVisited} cities</p>
    </div>
  );
}

export default Country;
