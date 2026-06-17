import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut,
  FiPackage, FiChevronDown, FiHeart, FiHome, FiGrid, FiTag, FiStar
} from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?keyword=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <FiHome size={15} /> },
    { to: '/products', label: 'Categories', icon: <FiGrid size={15} /> },
    { to: '/products?sort=discount', label: 'Deals', icon: <FiTag size={15} /> },
    { to: '/products?sort=rating', label: 'Trending', icon: <FiStar size={15} /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-wrap">
            <span className="logo-bolt">⚡</span>
          </div>
          <span className="logo-text">Shop<span className="logo-accent">EZ</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form className={`navbar-search ${searchFocused ? 'focused' : ''}`} onSubmit={handleSearch}>
          <FiSearch className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search premium products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {search && (
            <button type="submit" className="search-submit-btn">
              <FiSearch size={14} />
            </button>
          )}
        </form>

        {/* Right Actions */}
        <div className="navbar-right">
          {/* Wishlist */}
          <Link to="/products" className="nav-icon-btn" title="Wishlist">
            <FiHeart size={18} />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-icon-btn cart-btn" title="Cart">
            <FiShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="user-menu" ref={dropRef}>
              <button className="user-btn" onClick={() => setDropOpen(!dropOpen)}>
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name?.split(' ')[0]}</span>
                <FiChevronDown size={14} className={dropOpen ? 'rotated' : ''} />
              </button>
              {dropOpen && (
                <div className="dropdown animate-scaleIn">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="dropdown-username">{user.name}</div>
                      <div className="dropdown-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item"><FiUser size={15} /> Profile</Link>
                  <Link to="/profile" className="dropdown-item"><FiPackage size={15} /> My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item admin-link">
                      <span>🛡️</span> Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu animate-fadeIn">
          <form className="mobile-search" onSubmit={handleSearch}>
            <FiSearch size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </form>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="mobile-link">
              {link.icon} {link.label}
            </Link>
          ))}
          <div className="mobile-divider" />
          <Link to="/cart" className="mobile-link">
            <FiShoppingCart size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          <Link to="/products" className="mobile-link">
            <FiHeart size={16} /> Wishlist
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="mobile-link"><FiUser size={16} /> Profile</Link>
              {user.role === 'admin' && <Link to="/admin" className="mobile-link">🛡️ Admin Panel</Link>}
              <button className="mobile-link danger" onClick={handleLogout}>
                <FiLogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link"><FiUser size={16} /> Login</Link>
              <Link to="/register" className="mobile-link btn btn-primary btn-full" style={{ marginTop: '0.5rem' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
