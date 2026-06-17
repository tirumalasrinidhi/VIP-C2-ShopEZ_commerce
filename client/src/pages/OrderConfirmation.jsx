import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api/axios';
import { FiCheckCircle, FiPackage, FiMapPin, FiCreditCard } from 'react-icons/fi';
import './OrderConfirmation.css';

const STATUS_STEPS = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getOrderById(id);
        setOrder(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="loading-screen page-content"><div className="spinner" /></div>;
  if (!order) return null;

  const statusIdx = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div className="confirmation-page page-content">
      <div className="container">
        <div className="confirm-hero animate-scaleIn">
          <div className="confirm-icon"><FiCheckCircle size={56} /></div>
          <h1>Order Confirmed! 🎉</h1>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          <span className="order-id-badge">Order ID: #{order._id.slice(-8).toUpperCase()}</span>
        </div>

        {/* Status tracker */}
        <div className="status-tracker card">
          <h3>Order Status</h3>
          <div className="tracker-steps">
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className={`tracker-step ${i <= statusIdx ? 'done' : ''}`}>
                <div className="tracker-circle">{i < statusIdx ? '✓' : i + 1}</div>
                <span className="tracker-label">{s}</span>
                {i < STATUS_STEPS.length - 1 && <div className="tracker-line" />}
              </div>
            ))}
          </div>
        </div>

        <div className="confirm-grid">
          {/* Items */}
          <div className="card confirm-section">
            <h3><FiPackage /> Ordered Items</h3>
            <div className="confirm-items-list">
              {order.items.map((item, i) => {
                const dp = item.price - (item.price * item.discount) / 100;
                const img = item.image?.startsWith('http') ? item.image : item.image ? `http://localhost:5000${item.image}` : null;
                return (
                  <div key={i} className="conf-item">
                    {img && <img src={img} alt={item.name} />}
                    <div className="conf-item-info">
                      <p className="conf-item-name">{item.name}</p>
                      <p className="conf-item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="conf-item-price">₹{(dp * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                );
              })}
            </div>
            <div className="confirm-total">
              <div className="summary-row"><span>Subtotal</span><span>₹{order.itemsPrice.toLocaleString('en-IN')}</span></div>
              <div className="summary-row"><span>GST</span><span>₹{order.taxPrice.toLocaleString('en-IN')}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span></div>
              <hr className="divider" />
              <div className="summary-row total-row"><span>Total Paid</span><span>₹{order.totalPrice.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          <div className="confirm-meta">
            {/* Address */}
            <div className="card confirm-section">
              <h3><FiMapPin /> Shipping Address</h3>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>

            {/* Payment */}
            <div className="card confirm-section">
              <h3><FiCreditCard /> Payment</h3>
              <div className="pay-info">
                <p><strong>Method:</strong> {order.paymentMethod}</p>
                <p><strong>Status:</strong> <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{order.paymentStatus}</span></p>
              </div>
            </div>

            {/* CTA */}
            <div className="confirm-cta">
              <Link to="/profile" className="btn btn-primary btn-full">View All Orders</Link>
              <Link to="/products" className="btn btn-secondary btn-full">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
