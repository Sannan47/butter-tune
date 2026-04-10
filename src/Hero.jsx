import { products } from './data';
import styles from './Hero.module.css';

export default function Hero({ onShopNow, onProductClick, onOurStory }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Left copy */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>The New Rhythm of Skincare</p>
          <h1 className={styles.heading}>
            Tune Into Your<br />
            <em className={styles.accent}>Perfect Glow</em>
          </h1>
          <p className={styles.body}>
            Where science, self-care, and sensory beauty come into harmony.
            Thoughtfully crafted formulas to nourish, balance, and elevate
            your skin's natural radiance.
          </p>
          <div className={styles.ctas}>
            <button className={styles.btnPrimary} onClick={onShopNow}>Shop Now</button>
            <button className={styles.btnSecondary} onClick={onOurStory}>Our Story</button>
          </div>
          <div className={styles.stats}>
            {[['7+', 'Products'], ['100%', 'Natural'], ['Made in', 'Pakistan']].map(([val, label]) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statVal}>{val}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right product grid */}
        <div className={styles.visualArea}>
          <img src={products[4].image} className={styles.mainImage} />
          <img src={products[1].image} className={styles.secondaryImage} />
        </div>
      </div>
    </section>
  );
}