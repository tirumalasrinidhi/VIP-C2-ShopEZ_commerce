import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedProducts, getCategories } from '../api/axios';
import ProductCard from '../components/ProductCard';
import {
  FiArrowRight, FiShield, FiTruck, FiHeadphones, FiRefreshCw,
  FiZap, FiShoppingBag, FiChevronRight
} from 'react-icons/fi';
import './Home.css';

const CATEGORY_DATA = [
  { name: 'Electronics', icon: '📱', gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)', glow: 'rgba(59,130,246,0.3)' },
  { name: 'Fashion', icon: '👗', gradient: 'linear-gradient(135deg, #EC4899, #BE185D)', glow: 'rgba(236,72,153,0.3)' },
  { name: 'Beauty', icon: '💄', gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', glow: 'rgba(139,92,246,0.3)' },
  { name: 'Home & Kitchen', icon: '🏠', gradient: 'linear-gradient(135deg, #10B981, #059669)', glow: 'rgba(16,185,129,0.3)' },
  { name: 'Sports', icon: '⚽', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', glow: 'rgba(245,158,11,0.3)' },
  { name: 'Books', icon: '📚', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)', glow: 'rgba(6,182,212,0.3)' },
  { name: 'Toys', icon: '🧸', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)', glow: 'rgba(239,68,68,0.3)' },
  { name: 'Automotive', icon: '🚗', gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)', glow: 'rgba(99,102,241,0.3)' },
];



const WHY_SHOPEZ = [
  {
    icon: <FiTruck size={28} />,
    title: 'Free Shipping',
    desc: 'Free delivery on all orders above ₹499. Lightning-fast same-day delivery in select cities.',
    gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    glow: 'rgba(59,130,246,0.2)',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Secure Payments',
    desc: '256-bit SSL encryption on every transaction. Your financial data is always completely safe.',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    glow: 'rgba(139,92,246,0.2)',
  },
  {
    icon: <FiRefreshCw size={28} />,
    title: 'Easy Returns',
    desc: 'Not satisfied? Return within 30 days for a full refund. No questions asked, hassle-free.',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    glow: 'rgba(16,185,129,0.2)',
  },
  {
    icon: <FiHeadphones size={28} />,
    title: '24/7 Support',
    desc: 'Our expert team is available around the clock to assist you with any queries or concerns.',
    gradient: 'linear-gradient(135deg, #EC4899, #BE185D)',
    glow: 'rgba(236,72,153,0.2)',
  },
];





const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featRes, catRes] = await Promise.all([getFeaturedProducts(), getCategories()]);
        setFeatured(featRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const getCategoryData = (name) =>
    CATEGORY_DATA.find((c) => c.name === name) || CATEGORY_DATA[0];

  return (
    <div className="home-page">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero">
        {/* Animated background orbs */}
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-orb hero-orb-4" />
          <div className="hero-mesh" />
        </div>

        <div className="container hero-layout">
          {/* Left Content */}
          <div className="hero-content animate-fadeInUp">
            <div className="hero-pill">
              <span className="pill-dot" />
              <span>✨ New arrivals every week — Premium Selection</span>
            </div>

            <h1 className="hero-title">
              Welcome to <span className="hero-gradient">ShopEZ</span>
            </h1>

            <p className="hero-subtitle">
              Your One-Stop Destination for Effortless Online Shopping.
            </p>


            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary btn-lg hero-btn-primary">
                <FiShoppingBag size={18} /> Shop Now
              </Link>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Explore Collection <FiArrowRight size={16} />
              </Link>
            </div>


          </div>

        </div>
      </section>

      {/* ── FEATURES BAR ──────────────────────────────────── */}
      <section className="features-bar">
        <div className="container">
          <div className="features-ticker-wrap">
            <div className="features-ticker">
              {[...WHY_SHOPEZ, ...WHY_SHOPEZ].map((f, i) => (
                <div className="ticker-item" key={i}>
                  <span className="ticker-icon">{f.icon}</span>
                  <span>{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ───────────────────────────── */}
      <section className="section container">
        <div className="section-header-wrap">
          <div>
            <div className="section-eyebrow">Explore</div>
            <h2 className="section-title">Featured Categories</h2>
            <p className="section-subtitle">Browse our curated selection across top categories</p>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All <FiChevronRight size={16} />
          </Link>
        </div>

        <div className="categories-grid">
          {(categories.length > 0 ? categories : CATEGORY_DATA.map(c => c.name)).map((cat, i) => {
            const catData = getCategoryData(cat);
            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="category-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="category-card-inner">
                  <div
                    className="category-icon-wrap"
                    style={{ background: catData.gradient, boxShadow: `0 8px 24px ${catData.glow}` }}
                  >
                    <span className="category-icon">{catData.icon}</span>
                  </div>
                  <span className="category-name">{cat}</span>
                  <span className="category-arrow">
                    <FiArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>



      {/* ── TRENDING PRODUCTS ─────────────────────────────── */}
      <section className="section container">
        <div className="section-header-wrap">
          <div>
            <div className="section-eyebrow">Hot Now</div>
            <h2 className="section-title">Trending Products</h2>
            <p className="section-subtitle">Hand-picked by our experts, loved by thousands</p>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All <FiChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="loading-screen">
            <div className="spinner" />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {featured.map((p, i) => (
              <div key={p._id} style={{ animation: `fadeInUp 0.5s ease ${i * 0.07}s both` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── WHY SHOPEZ ────────────────────────────────────── */}
      <section className="why-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Our Promise</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose ShopEZ?</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              We're committed to delivering an exceptional shopping experience
            </p>
          </div>
          <div className="why-grid">
            {WHY_SHOPEZ.map((item, i) => (
              <div className="why-card" key={i}>
                <div
                  className="why-icon-wrap"
                  style={{
                    background: item.gradient,
                    boxShadow: `0 12px 30px ${item.glow}`,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── PREMIUM BANNER ────────────────────────────────── */}
      <section className="cta-banner-section section container">
        <div className="cta-banner-inner">
          <div className="cta-bg-orb" />
          <div className="cta-badge">🚀 Join 2M+ Shoppers</div>
          <h2 className="cta-title">
            Ready to Experience<br />
            <span className="text-gradient">Premium Shopping?</span>
          </h2>
          <p className="cta-desc">
            Create a free account and unlock exclusive member discounts, early access to sales, personalized recommendations, and so much more.
          </p>
          <div className="cta-btns">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free <FiArrowRight size={16} />
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
