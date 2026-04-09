import { CloseIcon, CheckIcon } from './Icons';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose, onAdd, justAdded }) {
  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.tag} style={{ background: product.color }}>{product.tag}</span>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.meta}>{product.subtitle} · {product.size}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Visual */}
        <div className={styles.visual} style={{ background: product.color }}>
          <span className={styles.symbol}>{product.symbol}</span>
        </div>

        <p className={styles.desc}>{product.description}</p>

        {/* Benefits */}
        <div className={styles.benefits}>
          <h4 className={styles.benefitsTitle}>Key Benefits</h4>
          <div className={styles.chips}>
            {product.benefits.map((b) => (
              <span key={b} className={styles.chip}>
                <span className={styles.check}><CheckIcon /></span>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>Rs. {product.price.toLocaleString()}</span>
            <span className={styles.size}>{product.size}</span>
          </div>
          <button
            className={styles.addBtn}
            style={{ background: justAdded ? 'var(--color-sage)' : 'var(--color-primary)' }}
            onClick={() => { onAdd(product); onClose(); }}
          >
            {justAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
