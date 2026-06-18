import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api/axios';
import toast from 'react-hot-toast';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import './Checkout.css';

const PAYMENT_METHODS = [
  { value: 'COD', label: 'Cash on Delivery', icon: '💵' },
  { value: 'Card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'UPI', label: 'UPI Payment', icon: '📱' },
  { value: 'Wallet', label: 'Wallet', icon: '👛' },
];

const Checkout = () => {
  const { cart, cartTotal, emptyCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const tax = +(cartTotal * 0.18).toFixed(2);
  const shipping = cartTotal > 500 ? 0 : 40;
  const total = +(cartTotal + tax + shipping).toFixed(2);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await placeOrder({ shippingAddress: address, paymentMethod });
      await emptyCart(); // sync CartContext — server already deleted the cart
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="checkout-page page-content">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '2rem' }}>Checkout</h1>

        {/* Steps */}
        <div className="checkout-steps">
          {['Shipping Address', 'Payment', 'Confirm Order'].map((s, i) => (
            <div key={i} className={`step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-circle">
                {step > i + 1 ? <FiCheck size={16} /> : <span>{i + 1}</span>}
              </div>
              <span className="step-label">{s}</span>
              {i < 2 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Step 1: Address */}
            {step === 1 && (
              <form className="card checkout-card animate-fadeInUp" onSubmit={handleAddressSubmit}>
                <h2><FiMapPin /> Shipping Address</h2>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input required value={address.fullName} onChange={e => setAddress({ ...address, fullName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input required value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} placeholder="123 Main St, Apt 4" />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input required value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input required value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Continue to Payment</button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="card checkout-card animate-fadeInUp">
                <h2><FiCreditCard /> Select Payment Method</h2>
                <div className="payment-methods">
                  {PAYMENT_METHODS.map(pm => (
                    <button
                      key={pm.value}
                      className={`payment-option ${paymentMethod === pm.value ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod(pm.value)}
                      type="button"
                    >
                      <span className="pay-icon">{pm.icon}</span>
                      <span className="pay-label">{pm.label}</span>
                      {paymentMethod === pm.value && <FiCheck className="pay-check" />}
                    </button>
                  ))}
                </div>
                <div className="checkout-step-btns">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>Review Order</button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="card checkout-card animate-fadeInUp">
                <h2>Review Your Order</h2>
                <div className="confirm-address">
                  <h4>Shipping to:</h4>
                  <p>{address.fullName}, {address.phone}</p>
                  <p>{address.street}, {address.city}, {address.state} - {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
                <div className="confirm-payment">
                  <h4>Payment:</h4>
                  <p>{PAYMENT_METHODS.find(p => p.value === paymentMethod)?.label}</p>
                </div>
                <div className="confirm-items">
                  <h4>Items ({cart.items.length}):</h4>
                  {cart.items.map(item => {
                    const dp = item.price - (item.price * item.discount) / 100;
                    return (
                      <div key={item._id} className="confirm-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{(dp * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="checkout-step-btns">
                  <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? <><span className="spinner spinner-sm" /> Placing...</> : '✓ Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="checkout-summary card">
            <h3>Order Total</h3>
            <div className="summary-rows">
              <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
              <div className="summary-row"><span>GST (18%)</span><span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
              <div className="summary-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <hr className="divider" />
              <div className="summary-row total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
