import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import CartPanel from './CartPanel';
import Footer from './Footer';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import CheckoutPage from './CheckoutPage';
import { products, categories, testimonials } from './data';
import { StarIcon } from './Icons';
import styles from './App.module.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedIds, setAddedIds] = useState(new Set());

  const filtered = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const marqueeRef = useRef(null);

  useEffect(() => {
    let x = 0;
    let raf;
    const track = marqueeRef.current;
    if (!track) return;

    const step = () => {
      x -= 1; // speed: increase number for faster
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(x) >= halfWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const navigate = useCallback((target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = (target) => {
    if (target === 'products') {
      setPage('home');
      setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      navigate(target);
    }
  };

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedIds((prev) => { const n = new Set(prev); n.add(product.id); return n; });
    setTimeout(() => setAddedIds((prev) => { const n = new Set(prev); n.delete(product.id); return n; }), 1200);
  }, []);

  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const updateQty = useCallback((id, delta) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)), []);

  const navPage = (page === 'home' || page === 'checkout') ? 'home' : page;

  if (page === 'about')   return <><Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onNavigate={handleNavigate} currentPage="about" /><AboutPage onBack={() => navigate('home')} /><Footer onNavigate={handleNavigate} /></>;
  if (page === 'contact') return <><Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onNavigate={handleNavigate} currentPage="contact" /><ContactPage onBack={() => navigate('home')} /><Footer onNavigate={handleNavigate} /></>;
  if (page === 'checkout') return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onNavigate={handleNavigate} currentPage="home" />
      <CheckoutPage cart={cart} onBack={() => navigate('home')} onOrderSent={() => { setCart([]); navigate('home'); }} />
      <Footer onNavigate={handleNavigate} />
    </>
  );

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onNavigate={handleNavigate} currentPage={navPage} />

      <main>
        <Hero
          onShopNow={() => setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 50)}
          onProductClick={setSelectedProduct}
          onOurStory={() => navigate('about')}
        />

        <section className={styles.pillars}>
          <div className={styles.pillarsInner}>
            {[
              { symbol: '◈', title: 'Science-Backed',   desc: 'Formulas crafted with care, combining proven actives with natural goodness.' },
              { symbol: '✦', title: 'Sensory Beauty',    desc: 'Every product is a ritual — textures, scents, and results that delight your senses.' },
              { symbol: '✿', title: 'Made in Pakistan',  desc: 'Proudly local, thoughtfully crafted for South Asian skin tones and climates.' },
            ].map(({ symbol, title, desc }) => (
              <div key={title} className={styles.pillar}>
                <span className={styles.pillarSymbol}>{symbol}</span>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className={styles.products}>
          <div className={styles.productsInner}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Our Collection</p>
              <h2 className={styles.sectionTitle}>Rituals for Every Skin</h2>
            </div>
            <div className={styles.filters}>
              {categories.map(({ key, label }) => (
                <button key={key} className={`${styles.filterBtn} ${activeCategory === key ? styles.filterActive : ''}`} onClick={() => setActiveCategory(key)}>
                  {label}
                </button>
              ))}
            </div>
            <div className={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onDetails={setSelectedProduct} onAdd={addToCart} justAdded={addedIds.has(product.id)} />
              ))}
            </div>
          </div>
        </section>

        <div className={styles.marqueeBar}>
          <div className={styles.marqueeTrack} ref={marqueeRef}>
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className={styles.marqueeContent}>
                ✦ Rice Serum · Rice Cleanser · Rice Cream · Zafran Cream · Cherry Butter · Coffee & Sugar Scrub · Blue Moroccan Scrub · Tune Into Your Perfect Glow ✦
              </span>
            ))}
          </div>
        </div>

        <section className={styles.routine}>
          <div className={styles.routineInner}>
            <p className={styles.eyebrow}>Build Your Ritual</p>
            <h2 className={styles.sectionTitle}>The Rice Collection Routine</h2>
            <div className={styles.routineSteps}>
              {[
                { step: '01', label: 'Cleanse',    product: 'Rice Cleanser', desc: 'Start with a clean, hydrated base' },
                { step: '02', label: 'Treat',      product: 'Rice Serum',    desc: 'Target fine lines & pigmentation' },
                { step: '03', label: 'Moisturize', product: 'Rice Cream',    desc: 'Lock in moisture for a bright glow' },
              ].map(({ step, label, product, desc }) => (
                <div key={step} className={styles.routineCard}>
                  <span className={styles.stepNum}>{step}</span>
                  <span className={styles.stepLabel}>{label}</span>
                  <span className={styles.stepProduct}>{product}</span>
                  <span className={styles.stepDesc}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <div className={styles.testimonialsInner}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>What People Say</p>
              <h2 className={styles.sectionTitle}>Real Glows, Real Stories</h2>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map(({ name, review, product, rating }) => (
                <div key={name} className={styles.testimonialCard}>
                  <div className={styles.stars}>
                    {Array(rating).fill(0).map((_, i) => <span key={i} style={{ color: 'var(--color-secondary)', display: 'flex' }}><StarIcon /></span>)}
                  </div>
                  <p className={styles.review}>"{review}"</p>
                  <div className={styles.reviewer}>
                    <span className={styles.reviewerName}>{name}</span>
                    <span className={styles.reviewerProduct}>Verified — {product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleNavigate} />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} justAdded={addedIds.has(selectedProduct.id)} />
      )}

      {cartOpen && (
        <CartPanel cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={() => { setCartOpen(false); navigate('checkout'); }} />
      )}
    </>
  );
}