import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, createReview } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiArrowLeft, FiTag, FiBox, FiStar } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProductById(id);
      setProduct(data);
    } catch {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleAddToCart = () => addItem(product._id, qty);

  const handleBuyNow = () => {
    addItem(product._id, qty);
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to leave a review'); return; }
    try {
      setSubmittingReview(true);
      await createReview(id, review);
      toast.success('Review submitted!');
      setReview({ rating: 5, comment: '' });
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="loading-screen page-content"><div className="spinner" /></div>;
  if (!product) return null;

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const images = product.images?.length
    ? product.images.map(i => i.startsWith('http') ? i : `http://localhost:5000${i}`)
    : ['https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600'];

  return (
    <div className="product-detail-page page-content">
      <div className="container">
        <Link to="/products" className="back-link"><FiArrowLeft /> Back to Products</Link>

        <div className="detail-grid">
          {/* Images */}
          <div className="detail-images">
            <div className="main-image">
              <img src={images[activeImg]} alt={product.name} />
              {product.discount > 0 && <span className="detail-badge">-{product.discount}% OFF</span>}
            </div>
            {images.length > 1 && (
              <div className="thumb-list">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>
            {product.brand && <p className="detail-brand">by <strong>{product.brand}</strong></p>}

            <div className="detail-rating">
              <StarRating rating={product.rating} size={18} />
              <span className="rating-num">{product.rating?.toFixed(1)}</span>
              <span className="rating-count">({product.numReviews} reviews)</span>
            </div>

            <div className="detail-price">
              <span className="price-final">₹{discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              {product.discount > 0 && <>
                <span className="price-original">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="price-savings badge badge-success">Save ₹{(product.price - discountedPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </>}
            </div>

            <div className="detail-stock">
              <FiBox size={16} />
              {product.stock > 0
                ? <span className="in-stock">In Stock ({product.stock} available)</span>
                : <span className="out-stock">Out of Stock</span>
              }
            </div>

            <p className="detail-description">{product.description}</p>

            {product.stock > 0 && (
              <>
                <div className="qty-wrap">
                  <label className="form-label">Quantity</label>
                  <div className="qty-control">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
                  </div>
                </div>

                <div className="detail-actions">
                  <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button className="btn btn-outline btn-lg" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          {product.reviews?.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map((r, i) => (
                <div key={i} className="review-card card">
                  <div className="review-header">
                    <div className="reviewer-avatar">{r.name?.charAt(0)}</div>
                    <div>
                      <p className="reviewer-name">{r.name}</p>
                      <StarRating rating={r.rating} size={14} />
                    </div>
                    <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>No reviews yet. Be the first to review!</p>
          )}

          {/* Write Review */}
          {user && (
            <div className="write-review card">
              <h3>Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <div className="rating-select">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n} type="button"
                        className={`star-btn ${review.rating >= n ? 'active' : ''}`}
                        onClick={() => setReview({ ...review, rating: n })}
                      >
                        <FiStar size={24} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience with this product..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
