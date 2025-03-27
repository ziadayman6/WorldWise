import AppNav from "../components/AppNav";
import HomeSection from "../components/HomeSection";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.body}>
      <AppNav />
      <HomeSection />
    </div>
  );
}
