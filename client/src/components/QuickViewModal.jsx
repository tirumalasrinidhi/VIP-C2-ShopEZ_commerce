import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product._id);
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const imageUrl = product.images?.[0]?.startsWith('http')
    ? product.images[0]
    : product.images?.[0]
      ? `http://localhost:5000${product.images[0]}`
      : `https://placehold.co/600x600/1a1a2e/ffffff?text=${encodeURIComponent(product.name?.slice(0, 12) || 'Product')}`;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="qv-backdrop" onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="qv-close" onClick={onClose} title="Close">
          <FiX size={20} />
        </button>

        {/* Image */}
        <div className="qv-image-wrap">
          <img src={imageUrl} alt={product.name} className="qv-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x600/1a1a2e/ffffff?text=${encodeURIComponent(product.name?.slice(0, 12) || 'Product')}`;
            }}
          />
          {product.discount > 0 && (
            <span className="qv-badge">-{product.discount}%</span>
          )}
        </div>

        {/* Details */}
        <div className="qv-details">
          <span className="qv-category">{product.category}</span>
          <h2 className="qv-name">{product.name}</h2>

          <div className="qv-rating">
            <StarRating rating={product.rating} size={15} />
            <span className="qv-rating-count">({product.numReviews?.toLocaleString() || 0} reviews)</span>
          </div>

          <div className="qv-pricing">
            <span className="qv-price">
              ₹{discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            {product.discount > 0 && (
              <span className="qv-original-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="qv-savings">
                Save ₹{(product.price - discountedPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            )}
          </div>

          <p className="qv-description">{product.description}</p>

          <div className="qv-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
            </span>
          </div>

          <div className="qv-actions">
            <button
              className="qv-cart-btn"
              onClick={() => { addItem(product._id, 1); onClose(); }}
              disabled={product.stock === 0}
            >
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
            <button
              className={`qv-wish-btn ${wishlisted ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product)}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <Link to={`/products/${product._id}`} className="qv-view-link" onClick={onClose}>
            View Full Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
