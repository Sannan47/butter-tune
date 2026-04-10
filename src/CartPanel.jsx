import { CloseIcon } from './Icons';
import styles from './CartPanel.module.css';

export default function CartPanel({ cart, onClose, onRemove, onUpdateQty, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptySymbol}>◈</span>
            <p className={styles.emptyText}>Your cart is empty</p>
            <button className={styles.shopBtn} onClick={onClose}>Shop Now</button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemThumb} style={{ background: item.color }}>
                    {item.symbol}
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemSize}>{item.size}</span>
                    <div className={styles.itemFooter}>
                      <div className={styles.qty}>
                        <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.id, -1)}>−</button>
                        <span className={styles.qtyNum}>{item.qty}</span>
                        <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.id, 1)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>Rs. {(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => onRemove(item.id)} aria-label="Remove">×</button>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>Rs. {total.toLocaleString()}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={() => { onClose(); onCheckout(); }}>
                Proceed to Checkout →
              </button>
              <p className={styles.checkoutNote}>You'll fill your details and we'll open Whatsapp with your order pre-filled</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}