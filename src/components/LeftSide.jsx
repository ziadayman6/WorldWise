import Changer from "./Changer";
import styles from "./LeftSide.module.css";
import { Outlet } from "react-router-dom";

function LeftSide() {
  return (
    <>
      <img src="/logo.png" alt="none" className={styles.image} />
      <div className={styles.lists}>
        <Changer />
        <Outlet />
      </div>
      <p className={styles.copy}>Copyright &copy; WorldWise 2025.</p>
    </>
  );
}

export default LeftSide;
