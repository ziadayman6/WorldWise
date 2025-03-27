import { Link } from "react-router-dom";
import styles from "./HomeSection.module.css";

function HomeSection() {
  return (
    <div className={styles.body}>
      <h1>
        You travel the world. <br /> WorldWise keeps track of your adventures.
      </h1>
      <p>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </p>
      <Link to="/login" className={styles.btn}>START TRACKING NOW</Link>
    </div>
  );
}

export default HomeSection;
