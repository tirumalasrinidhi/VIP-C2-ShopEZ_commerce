import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cart, updateItem, removeItem, emptyCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const tax = +(cartTotal * 0.18).toFixed(2);
  const shipping = cartTotal > 500 ? 0 : 40;
  const total = +(cartTotal + tax + shipping).toFixed(2);

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="page-content container">
        <div className="empty-state" style={{ paddingTop: '6rem' }}>
          <div className="empty-icon"><FiShoppingBag size={64} /></div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Start Shopping <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-content">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Shopping Cart</h1>
        <p className="section-subtitle">{cart.items.length} item{cart.items.length > 1 ? 's' : ''} in your cart</p>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.items.map((item, i) => {
              const discountedPrice = item.price - (item.price * item.discount) / 100;
              const imgUrl = item.image?.startsWith('http')
                ? item.image
                : item.image ? `http://localhost:5000${item.image}` : 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=200';

              return (
                <div key={item._id} className="cart-item card animate-fadeInUp" style={{ animationDelay: `${i * 0.07}s` }}>
                  <img src={imgUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-price">
                      <span className="final-price">₹{discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      {item.discount > 0 && (
                        <span className="orig-price">₹{item.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateItem(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <FiMinus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItem(item._id, item.quantity + 1)}>
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(discountedPrice * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item._id)} title="Remove">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              );
            })}

            <button className="btn btn-secondary btn-sm" onClick={emptyCart} style={{ alignSelf: 'flex-start', gap: '0.4rem' }}>
              <FiTrash2 size={14} /> Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="shipping-note">Add ₹{(500 - cartTotal).toFixed(0)} more for free shipping!</p>
              )}
              <hr className="divider" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <FiArrowRight />
            </button>
            <Link to="/products" className="continue-link">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
