import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';
import QuickViewModal from './QuickViewModal';
import { FiShoppingCart, FiEye, FiHeart, FiZap } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [showQuickView, setShowQuickView] = useState(false);

  const wishlisted = isWishlisted(product._id);
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product._id, 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const imageUrl = product.images?.[0]?.startsWith('http')
    ? product.images[0]
    : product.images?.[0]
      ? `http://localhost:5000${product.images[0]}`
      : `https://placehold.co/400x400/1a1a2e/ffffff?text=${encodeURIComponent(product.name?.slice(0, 12) || 'Product')}`;

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/400x400/1a1a2e/ffffff?text=${encodeURIComponent(product.name?.slice(0, 12) || 'Product')}`;
  };

  return (
    <>
      <div className="product-card">
        <Link to={`/products/${product._id}`} className="product-card-img-wrap">
          <img src={imageUrl} alt={product.name} className="product-img" loading="lazy" onError={handleImgError} />

          {/* Discount badge */}
          {product.discount > 0 && (
            <div className="discount-badge">
              <FiZap size={10} fill="currentColor" />
              -{product.discount}%
            </div>
          )}

          {/* Hover overlay actions */}
          <div className="card-overlay">
            <button
              className="overlay-btn"
              title="Quick view"
              onClick={handleQuickView}
            >
              <FiEye size={16} />
            </button>
            <button
              className={`overlay-btn${wishlisted ? ' overlay-btn--wishlisted' : ''}`}
              title={wishlisted ? 'Remove from wishlist' : 'Add to Wishlist'}
              onClick={handleWishlist}
            >
              <FiHeart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Image shine effect */}
          <div className="img-shine" />
        </Link>

        <div className="product-info">
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            {product.discount > 10 && (
              <span className="hot-label">🔥 Hot</span>
            )}
          </div>

          <Link to={`/products/${product._id}`} className="product-name-link">
            <h3 className="product-name">{product.name}</h3>
          </Link>

          <div className="product-rating">
            <StarRating rating={product.rating} size={13} />
            <span className="rating-count">({product.numReviews || 0})</span>
          </div>

          <div className="product-pricing">
            <span className="product-price">
              ₹{discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            {product.discount > 0 && (
              <span className="product-original-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            <FiShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Quick View Modal — rendered via portal-like pattern outside card */}
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
