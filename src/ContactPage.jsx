import { InstagramIcon } from './Icons';
import styles from './ContactPage.module.css';

export default function ContactPage({ onBack }) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={onBack}>← Back</button>

        <div className={styles.hero}>
          <p className={styles.eyebrow}>Get In Touch</p>
          <h1 className={styles.heading}>We'd Love to<br /><em>Hear From You</em></h1>
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <span className={styles.infoSymbol}>✦</span>
              <h3 className={styles.infoTitle}>Instagram (Primary)</h3>
              <p className={styles.infoDesc}>The fastest way to reach us — DM us for orders, queries, or just to say hi!</p>
              <a
                href="https://instagram.com/butter.tune_skincare"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instaBtn}
              >
                <InstagramIcon /> @butter.tune_skincare
              </a>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoSymbol}>◈</span>
              <h3 className={styles.infoTitle}>Location</h3>
              <p className={styles.infoDesc}>Based in Islamabad, Pakistan. We ship nationwide and attend local markets regularly.</p>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoSymbol}>✿</span>
              <h3 className={styles.infoTitle}>Order Enquiries</h3>
              <p className={styles.infoDesc}>Add items to your cart and use our checkout to send us a pre-filled order message on Instagram.</p>
            </div>
          </div>

          <div className={styles.mapCard}>
            <div className={styles.mapVisual}>
              <span className={styles.mapPin}>📍</span>
              <p className={styles.mapCity}>Islamabad, Pakistan</p>
              <p className={styles.mapSub}>Nationwide shipping available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}