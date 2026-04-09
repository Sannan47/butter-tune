import { CartIcon } from './Icons';
import styles from './Navbar.module.css';

export default function Navbar({ cartCount, onCartOpen, onNavigate, currentPage }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo — clicking goes home */}
        <button className={styles.logoBtn} onClick={() => onNavigate('home')}>
          <div className={styles.logoText}>
            <span className={styles.logoButter}>BUTTER</span>
            <span className={styles.logoTune}>TUNE</span>
          </div>
          <span className={styles.logoSub}>Skincare</span>
        </button>

        {/* Links */}
        <div className={styles.links}>
          {[
            { label: 'Home',     page: 'home'     },
            { label: 'Products', page: 'products' },
            { label: 'About',    page: 'about'    },
            { label: 'Contact',  page: 'contact'  },
          ].map(({ label, page }) => (
            <button
              key={page}
              className={`${styles.link} ${currentPage === page ? styles.linkActive : ''}`}
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cart */}
        <button className={styles.cartBtn} onClick={onCartOpen} aria-label="Open cart">
          <CartIcon />
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}