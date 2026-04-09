import { StarIcon } from './Icons';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onDetails, onAdd, justAdded }) {
  return (
    <div className={styles.card}>
      {/* Visual area */}
      <div className={styles.visual} style={{ background: product.color }}>
        <span className={styles.tag}>{product.tag}</span>
        <span className={styles.symbol}>{product.symbol}</span>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.subtitle}>{product.subtitle}</span>
      </div>

      {/* Info area */}
      <div className={styles.info}>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={styles.star}><StarIcon /></span>
          ))}
          <span className={styles.reviewCount}>(24)</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>Rs. {product.price.toLocaleString()}</span>
            <span className={styles.size}>{product.size}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnDetails} onClick={() => onDetails(product)}>
              Details
            </button>
            <button
              className={styles.btnAdd}
              style={{ background: justAdded ? 'var(--color-sage)' : 'var(--color-primary)' }}
              onClick={() => onAdd(product)}
            >
              {justAdded ? '✓' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
