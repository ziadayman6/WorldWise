import styles from "./SpinnerPage.module.css";

function SpinnerPage() {
  return (
    <div className={styles.page}>
      <div className={styles.outer}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}

export default SpinnerPage;
