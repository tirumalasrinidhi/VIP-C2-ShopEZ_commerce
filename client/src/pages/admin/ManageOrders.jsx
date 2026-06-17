import { useState, useEffect } from 'react';
import { adminGetOrders, adminUpdateOrder } from '../../api/axios';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import { FiRefreshCw } from 'react-icons/fi';
import './AdminLayout.css';

const ORDER_STATUSES = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const PAYMENT_STATUSES = ['Pending', 'Paid', 'Failed'];

const STATUS_CLASS = {
  Processing: 'badge-warning', Confirmed: 'badge-info', Shipped: 'badge-primary',
  Delivered: 'badge-success', Cancelled: 'badge-danger'
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await adminGetOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (id, field, value) => {
    setUpdatingId(id);
    try {
      const { data } = await adminUpdateOrder(id, { [field]: value });
      setOrders(orders.map(o => o._id === id ? data : o));
      toast.success('Order updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Manage Orders</h1>
          <p>{orders.length} total orders</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchOrders}><FiRefreshCw size={14} /> Refresh</button>
      </div>

      {loading ? (
        <div className="loading-screen"><div className="spinner" /></div>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Payment</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <>
                  <tr key={order._id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{order.user?.name || 'N/A'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.user?.email}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{order.totalPrice.toLocaleString('en-IN')}</td>
                    <td>
                      <select
                        className="admin-select"
                        value={order.orderStatus}
                        onChange={e => handleStatusUpdate(order._id, 'orderStatus', e.target.value)}
                        disabled={updatingId === order._id}
                      >
                        {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <select
                        className="admin-select"
                        value={order.paymentStatus}
                        onChange={e => handleStatusUpdate(order._id, 'paymentStatus', e.target.value)}
                        disabled={updatingId === order._id}
                      >
                        {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                      >
                        {expandedId === order._id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === order._id && (
                    <tr key={`${order._id}-detail`}>
                      <td colSpan={7} style={{ background: 'var(--bg-elevated)', padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                          <div>
                            <strong>Shipping Address:</strong>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: 1.6 }}>
                              {order.shippingAddress.fullName}<br />
                              {order.shippingAddress.phone}<br />
                              {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                              {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                            </p>
                          </div>
                          <div>
                            <strong>Items:</strong>
                            <ul style={{ marginTop: '0.3rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                              {order.items.map((item, i) => (
                                <li key={i}>{item.name} × {item.quantity} — ₹{((item.price - item.price * item.discount / 100) * item.quantity).toFixed(0)}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-select {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
          cursor: pointer;
          width: auto;
        }
      `}</style>
    </AdminLayout>
  );
};

export default ManageOrders;
