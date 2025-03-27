import { useParams } from "react-router-dom";
import LeftSide from "../components/LeftSide";
import Logout from "../components/Logout";
import styles from "./MainPage.module.css";
import Map from "../components/Map";


export default function MainPage() {
  const { username } = useParams();

  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.right}>
        <Logout username={username} />
        <Map />
      </div>
    </div>
  );
}
