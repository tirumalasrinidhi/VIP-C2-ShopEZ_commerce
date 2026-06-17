import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiLinkedin, FiYoutube, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top glow line */}
      <div className="footer-glow-line" />

      <div className="container">
        {/* Main Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">⚡</div>
              <span>Shop<span className="footer-logo-accent">EZ</span></span>
            </Link>
            <p className="footer-tagline">
              Your one-stop destination for effortless online shopping. Discover curated products across all categories with the best deals and fastest delivery.
            </p>

            {/* Social Links */}
            <div className="footer-social">
              {[
                { icon: <FiTwitter size={16} />, label: 'Twitter', href: '#', gradient: 'linear-gradient(135deg, #1DA1F2, #0D6EFD)' },
                { icon: <FiInstagram size={16} />, label: 'Instagram', href: '#', gradient: 'linear-gradient(135deg, #E1306C, #833AB4)' },
                { icon: <FiLinkedin size={16} />, label: 'LinkedIn', href: '#', gradient: 'linear-gradient(135deg, #0077B5, #005885)' },
                { icon: <FiYoutube size={16} />, label: 'YouTube', href: '#', gradient: 'linear-gradient(135deg, #FF0000, #CC0000)' },
                { icon: <FiGithub size={16} />, label: 'GitHub', href: '#', gradient: 'linear-gradient(135deg, #6e5494, #4B3A8C)' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-link"
                  title={s.label}
                  aria-label={s.label}
                  data-gradient={s.gradient}
                  style={{ '--hover-gradient': s.gradient }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="footer-trust">
              <div className="ft-badge">🔒 SSL Secured</div>
              <div className="ft-badge">💳 Safe Payments</div>
              <div className="ft-badge">🌟 Premium Quality</div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop</h4>
            <ul className="footer-links">
              {[
                { label: 'All Products', to: '/products' },
                { label: 'Electronics', to: '/products?category=Electronics' },
                { label: 'Fashion', to: '/products?category=Fashion' },
                { label: 'Beauty', to: '/products?category=Beauty' },
                { label: 'Home & Kitchen', to: '/products?category=Home+%26+Kitchen' },
                { label: 'Sports', to: '/products?category=Sports' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    <FiArrowRight size={12} className="footer-link-arrow" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="footer-col">
            <h4 className="footer-col-title">Account</h4>
            <ul className="footer-links">
              {[
                { label: 'My Account', to: '/profile' },
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
                { label: 'My Orders', to: '/profile' },
                { label: 'My Cart', to: '/cart' },
                { label: 'Wishlist', to: '/products' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    <FiArrowRight size={12} className="footer-link-arrow" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-contact-item">
                  <div className="contact-icon-wrap"><FiMail size={13} /></div>
                  support@shopez.com
                </span>
              </li>
              <li>
                <span className="footer-contact-item">
                  <div className="contact-icon-wrap"><FiPhone size={13} /></div>
                  +91 98765 43210
                </span>
              </li>
              <li>
                <span className="footer-contact-item">
                  <div className="contact-icon-wrap"><FiMapPin size={13} /></div>
                  Hyderabad, Telangana, India
                </span>
              </li>
            </ul>

            {/* Hours */}
            <div className="footer-hours">
              <div className="hours-dot" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>24/7 Support</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Always here to help you</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© {new Date().getFullYear()} <span className="footer-brand-name">ShopEZ</span>. All rights reserved. Made with ❤️ in India.</p>
          </div>
          <div className="footer-bottom-right">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-dot">•</span>
            <a href="#" className="footer-legal-link">Terms of Service</a>
            <span className="footer-dot">•</span>
            <a href="#" className="footer-legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: rgba(10, 15, 30, 0.98);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 5rem 0 2rem;
          margin-top: auto;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 300px;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-glow-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.5), rgba(236,72,153,0.4), transparent);
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
          position: relative;
        }

        /* Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .footer-logo-icon {
          width: 38px; height: 38px;
          background: var(--gradient-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 16px rgba(59,130,246,0.4);
        }

        .footer-logo-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-tagline {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        /* Social */
        .footer-social {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .social-link {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: all 0.25s ease;
        }

        .social-link:hover {
          background: var(--hover-gradient);
          border-color: transparent;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }

        /* Trust badges */
        .footer-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .ft-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          color: var(--text-secondary);
        }

        /* Column Headers */
        .footer-col-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--gradient-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        /* Links */
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: all 0.2s;
          text-decoration: none;
        }

        .footer-link-arrow {
          color: var(--primary-light);
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .footer-link:hover {
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .footer-link:hover .footer-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Contact */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .contact-icon-wrap {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-light);
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .footer-hours {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 10px;
          margin-top: 1.25rem;
        }

        .hours-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #10B981;
          flex-shrink: 0;
          box-shadow: 0 0 8px #10B981;
          animation: pulse-glow-green 2s ease-in-out infinite;
        }

        @keyframes pulse-glow-green {
          0%, 100% { box-shadow: 0 0 6px #10B981; }
          50% { box-shadow: 0 0 16px #10B981; }
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(139,92,246,0.15), rgba(255,255,255,0.08), transparent);
          margin-bottom: 2rem;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-bottom-left p {
          font-size: 0.83rem;
          color: var(--text-muted);
        }

        .footer-brand-name {
          font-weight: 700;
          background: var(--gradient-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-legal-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal-link:hover { color: var(--primary-light); }

        .footer-dot {
          color: var(--text-muted);
          font-size: 0.7rem;
          opacity: 0.5;
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-tagline { max-width: 100%; }
        }

        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
          .footer-bottom-right { justify-content: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
