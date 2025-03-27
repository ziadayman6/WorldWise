import { NavLink } from "react-router-dom";
import styles from "./Changer.module.css";

function Changer() {
  return (
    <div className={styles.list}>
      <NavLink to="cities">CITIES</NavLink>
      <NavLink to="countries">COUNTRIES</NavLink>
    </div>
  );
}

export default Changer;
