import { useState } from 'react';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage({ cart, onBack, onOrderSent }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name';
    if (!form.phone.trim())   e.phone   = 'Please enter your phone number';
    if (!form.address.trim()) e.address = 'Please enter your address';
    if (!form.city.trim())    e.city    = 'Please enter your city';
    return e;
  };

  const buildMessage = () => {
    const lines = [
      `Hi Butter Tune! I'd like to place an order`,
      ``,
      ` ORDER DETAILS:`,
      `─────────────────`,
      ...cart.map(i => `• ${i.name} (${i.size}) × ${i.qty}  —  Rs. ${(i.price * i.qty).toLocaleString()}`),
      `─────────────────`,
      `Total: Rs. ${total.toLocaleString()}`,
      ``,
      `CUSTOMER INFO:`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}, ${form.city}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ].filter(l => l !== undefined);

    return lines.join('\n');
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const message = buildMessage();
    const encoded = encodeURIComponent(message);
    // Instagram DM deep link — opens Instagram app or web
    // const igUrl = `https://ig.me/m/butter.tune_skincare?text=${encoded}`;

    // WhatsApp deep link — opens WhatsApp app or web
    const waUrl = `https://wa.me/923335775929?text=${encoded}`;
    window.open(waUrl, '_blank');

    setSent(true);
    setTimeout(() => {
      // window.open(igUrl, '_blank');
      window.open(waUrl, '_blank');
    }, 400);
  };

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <span className={styles.successSymbol}>✦</span>
          <h2 className={styles.successTitle}>Opening Instagram…</h2>
          <p className={styles.successDesc}>
            Your order message is pre-filled and ready. Just hit <strong>Send</strong> in the DM!
          </p>
          <button className={styles.btnPrimary} onClick={onBack} style={{ marginTop: 24 }}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={onBack}>← Back to Cart</button>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Almost There</p>
          <h1 className={styles.heading}>Complete Your Order</h1>
          <p className={styles.subhead}>Fill in your details and we'll open Instagram with a pre-filled message — just tap Send!</p>
        </div>

        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.form}>
            <h3 className={styles.formTitle}>Your Details</h3>

            <div className={styles.field}>
              <label className={styles.label}>Full Name *</label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                placeholder="e.g. Aisha Khan"
                value={form.name}
                onChange={set('name')}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Phone Number *</label>
              <input
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                type="tel"
                placeholder="e.g. 0300-1234567"
                value={form.phone}
                onChange={set('phone')}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Street Address *</label>
              <input
                className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                type="text"
                placeholder="House/Apt, Street, Area"
                value={form.address}
                onChange={set('address')}
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>City *</label>
              <input
                className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                type="text"
                placeholder="e.g. Islamabad"
                value={form.city}
                onChange={set('city')}
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Order Notes <span className={styles.optional}>(optional)</span></label>
              <textarea
                className={styles.textarea}
                placeholder="Any special requests or questions…"
                rows={3}
                value={form.notes}
                onChange={set('notes')}
              />
            </div>
          </div>

          {/* Order summary */}
          <div className={styles.summary}>
            <h3 className={styles.formTitle}>Order Summary</h3>

            <div className={styles.summaryItems}>
              {cart.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.summaryThumb} style={{ background: item.color }}>
                    {item.symbol}
                  </div>
                  <div className={styles.summaryInfo}>
                    <span className={styles.summaryName}>{item.name}</span>
                    <span className={styles.summaryMeta}>{item.size} × {item.qty}</span>
                  </div>
                  <span className={styles.summaryPrice}>Rs. {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalAmt}>Rs. {total.toLocaleString()}</span>
            </div>

            {/* Preview message */}
            <div className={styles.preview}>
              <p className={styles.previewLabel}>Message Preview</p>
              <pre className={styles.previewText}>{buildMessage()}</pre>
            </div>
              
            <button className={styles.btnPrimary} onClick={handleSubmit}>
              Send Order via Whatsapp DM →
            </button>
            <p className={styles.note}>
              Tapping the button opens Whatsapp with this message pre-filled. Just hit Send!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}