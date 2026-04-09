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
        <div className={styles.grid}>
          {products.slice(0, 4).map((p, i) => (
            <button
              key={p.id}
              className={styles.card}
              style={{ background: p.color, transform: i % 2 === 1 ? 'translateY(20px)' : 'none' }}
              onClick={() => onProductClick(p)}
            >
              <span className={styles.cardSymbol}>{p.symbol}</span>
              <span className={styles.cardName}>{p.name}</span>
              <span className={styles.cardPrice}>Rs. {p.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}