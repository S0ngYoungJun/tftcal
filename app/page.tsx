import RerollCalculator from '../components/RerollCalculator';
import styles from '../styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>TFT Reroll Calculator</div>
        <RerollCalculator />
      </main>
    </div>
  );
}