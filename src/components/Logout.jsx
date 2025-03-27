import { useCities } from "../contexts/CitiesContext";
import styles from "./Logout.module.css";
import { Link } from "react-router-dom";

function Logout({ username }) {
  const { dispatch } = useCities();
  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <p>WELCOME, {username}!</p>
      <Link to="/login" onClick={() => dispatch({ type: "logout" })}>
        LOGOUT
      </Link>
    </div>
  );
}

export default Logout;
