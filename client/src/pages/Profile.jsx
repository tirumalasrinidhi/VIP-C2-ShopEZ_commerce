import { useState, useEffect } from 'react';
import { getMyOrders, updateProfile } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiPackage, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import './Profile.css';

const ORDER_STATUS_CLASS = {
  Processing: 'badge-warning',
  Confirmed: 'badge-info',
  Shipped: 'badge-primary',
  Delivered: 'badge-success',
  Cancelled: 'badge-danger',
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: { ...user?.address }
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await updateProfile(form);
      updateUser(data);
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page page-content">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-hero card animate-fadeInUp">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-meta">
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <span className={`badge ${user?.role === 'admin' ? 'badge-danger' : 'badge-primary'}`}>
              {user?.role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
            </span>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-v">{orders.length}</span>
              <span className="stat-l">Orders</span>
            </div>
            <div className="profile-stat">
              <span className="stat-v">
                ₹{orders.reduce((s, o) => s + o.totalPrice, 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className="stat-l">Spent</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <FiPackage /> My Orders
          </button>
          <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <FiUser /> Profile Settings
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-fadeIn">
            {loadingOrders ? (
              <div className="loading-screen"><div className="spinner" /></div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><FiPackage size={48} /></div>
                <h3>No orders yet</h3>
                <p>Your order history will appear here</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order, i) => (
                  <div key={order._id} className="order-card card animate-fadeInUp" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="order-header">
                      <div>
                        <p className="order-id">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <span className={`badge ${ORDER_STATUS_CLASS[order.orderStatus] || 'badge-info'}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="order-items-preview">
                      {order.items.slice(0, 3).map((item, j) => {
                        const img = item.image?.startsWith('http') ? item.image : item.image ? `http://localhost:5000${item.image}` : null;
                        return img ? <img key={j} src={img} alt={item.name} className="order-item-thumb" title={item.name} /> : null;
                      })}
                      {order.items.length > 3 && <span className="more-items">+{order.items.length - 3}</span>}
                      <div className="order-item-names">
                        {order.items.map(i => i.name).join(', ').substring(0, 60)}
                        {order.items.map(i => i.name).join(', ').length > 60 ? '...' : ''}
                      </div>
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <strong>₹{order.totalPrice.toLocaleString('en-IN')}</strong>
                      </div>
                      <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Settings Tab */}
        {activeTab === 'profile' && (
          <div className="profile-settings card animate-fadeIn">
            <div className="settings-header">
              <h3>Personal Information</h3>
              {!editing ? (
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                  <FiEdit3 size={14} /> Edit
                </button>
              ) : (
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                  <FiX size={14} /> Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input value={form.name} disabled={!editing} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input value={form.phone} disabled={!editing} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <h4 className="address-heading">Address</h4>
              <div className="form-group">
                <label className="form-label">Street</label>
                <input value={form.address?.street || ''} disabled={!editing} onChange={e => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input value={form.address?.city || ''} disabled={!editing} onChange={e => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input value={form.address?.state || ''} disabled={!editing} onChange={e => setForm({ ...form, address: { ...form.address, state: e.target.value } })} />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">PIN Code</label>
                  <input value={form.address?.zipCode || ''} disabled={!editing} onChange={e => setForm({ ...form, address: { ...form.address, zipCode: e.target.value } })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input value={form.address?.country || ''} disabled={!editing} onChange={e => setForm({ ...form, address: { ...form.address, country: e.target.value } })} />
                </div>
              </div>

              {editing && (
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <FiSave size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
