import styles from './AboutPage.module.css';

export default function AboutPage({ onBack }) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={onBack}>← Back</button>

        <div className={styles.hero}>
          <p className={styles.eyebrow}>Our Story</p>
          <h1 className={styles.heading}>Where Science Meets<br /><em>Sensory Beauty</em></h1>
        </div>

        <div className={styles.body}>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>How It Started</h2>
            <p className={styles.blockText}>
              Butter Tune Skincare was born from a simple frustration — too many products that stripped the skin dry, loaded with harsh chemicals, and built for skin types that didn't reflect Pakistan. We wanted something different. Something that worked <em>with</em> your skin, not against it.
            </p>
            <p className={styles.blockText}>
              Our founder started experimenting with rice-based formulas inspired by ancient South and East Asian beauty rituals, blending them with modern skincare science. The result? A line that truly nourishes, balances, and glows.
            </p>
          </div>

          <div className={styles.values}>
            {[
              { symbol: '✦', title: 'Science-Backed',    desc: 'Every formula is built on proven actives, tested and refined for real results.' },
              { symbol: '✿', title: 'Made in Pakistan',   desc: 'Proudly crafted locally, for skin tones and climates like ours.' },
              { symbol: '◈', title: 'No Harsh Stripping', desc: 'We never compromise your skin barrier. Gentle enough for daily use.' },
              { symbol: '❋', title: 'Sensory Rituals',    desc: 'Skincare should feel like self-care. Every texture, scent, and finish is intentional.' },
            ].map(({ symbol, title, desc }) => (
              <div key={title} className={styles.valueCard}>
                <span className={styles.valueSymbol}>{symbol}</span>
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDesc}>{desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>The Name</h2>
            <p className={styles.blockText}>
              <strong>Butter</strong> — for the rich, nourishing textures we use. Shea, mango, cherry. Ingredients that melt into your skin.
            </p>
            <p className={styles.blockText}>
              <strong>Tune</strong> — because skincare is about finding your rhythm. Your perfect routine. Your perfect glow. We're here to help you tune in.
            </p>
            <blockquote className={styles.quote}>"Tune into your perfect glow."</blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}