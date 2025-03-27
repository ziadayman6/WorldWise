import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <Link to="/" className={styles.linkImg}>
        <img src="logo.png" alt="none" />
      </Link>
    </div>
  );
}

export default AppNav;
