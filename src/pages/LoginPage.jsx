import AppNav from "../components/AppNav";
import LoginSection from "../components/LoginSection";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.body}>
      <AppNav />
      <LoginSection />
    </div>
  );
}
