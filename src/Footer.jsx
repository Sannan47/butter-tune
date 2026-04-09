import { InstagramIcon } from './Icons';
import styles from './Footer.module.css';

export default function Footer({ onNavigate }) {
  const nav = onNavigate || (() => {});
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <button className={styles.logoBtn} onClick={() => nav('home')}>
              <div className={styles.logoText}>
                <span className={styles.logoButter}>BUTTER</span>
                <span className={styles.logoTune}>TUNE</span>
              </div>
            </button>
            <p className={styles.tagline}>
              The new rhythm of skincare — where science, self-care, and
              sensory beauty come into harmony.
            </p>
            <a
              href="https://instagram.com/butter.tune_skincare"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instaLink}
            >
              <InstagramIcon /> @butter.tune_skincare
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className={styles.colTitle}>Shop</h4>
            {[
              { label: 'All Products', page: 'products' },
              { label: 'Face Care',    page: 'products' },
              { label: 'Body Care',    page: 'products' },
              { label: 'Scrubs',       page: 'products' },
            ].map(({ label, page }) => (
              <button key={label} className={styles.colLink} onClick={() => nav(page)}>{label}</button>
            ))}
          </div>

          {/* Info */}
          <div>
            <h4 className={styles.colTitle}>Info</h4>
            {[
              { label: 'Our Story',  page: 'about'   },
              { label: 'Contact Us', page: 'contact' },
            ].map(({ label, page }) => (
              <button key={label} className={styles.colLink} onClick={() => nav(page)}>{label}</button>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 Butter Tune Skincare. Made with love in Pakistan.</span>
          <span className={styles.bottomRight}>Tune into your perfect glow ✦</span>
        </div>
      </div>
    </footer>
  );
}