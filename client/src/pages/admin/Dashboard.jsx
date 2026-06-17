import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../api/axios';
import AdminLayout from './AdminLayout';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import './AdminLayout.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAdminStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <AdminLayout><div className="loading-screen"><div className="spinner" /></div></AdminLayout>;

  const maxRevenue = Math.max(...(stats.monthlyRevenue.map(m => m.revenue) || [1]));

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store.</p>
        </div>
        <Link to="/products" className="btn btn-primary btn-sm">View Store <FiArrowRight /></Link>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'rgba(108,99,255,0.15)', iconColor: 'var(--primary)' },
          { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'rgba(67,233,123,0.15)', iconColor: 'var(--accent)' },
          { label: 'Total Orders', value: stats.totalOrders, icon: '🛒', color: 'rgba(249,202,36,0.15)', iconColor: 'var(--accent-2)' },
          { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: '💰', color: 'rgba(255,101,132,0.15)', iconColor: 'var(--secondary)' },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="stat-card-icon" style={{ background: s.color }}>{s.icon}</div>
            <span className="stat-card-label">{s.label}</span>
            <span className="stat-card-value">{s.value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 700 }}>Monthly Revenue</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px' }}>
            {stats.monthlyRevenue.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to top, var(--primary), var(--primary-light))',
                    borderRadius: '4px 4px 0 0',
                    height: `${Math.max(8, (m.revenue / maxRevenue) * 100)}%`,
                    transition: 'height 0.5s ease',
                    minHeight: 4,
                    opacity: 0.85
                  }}
                  title={`₹${m.revenue.toLocaleString('en-IN')}`}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {MONTHS[(m._id.month - 1)]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Status */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 700 }}>Orders by Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.ordersByStatus.map((s, i) => {
              const total = stats.totalOrders || 1;
              const pct = Math.round((s.count / total) * 100);
              const colors = { Processing: 'var(--accent-2)', Confirmed: '#74b9ff', Shipped: 'var(--primary)', Delivered: 'var(--accent)', Cancelled: '#ff6b81' };
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{s._id}</span>
                    <span style={{ fontWeight: 600 }}>{s.count}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-elevated)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: colors[s._id] || 'var(--primary)', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      {stats.topProducts.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700 }}>Top Selling Products</h3>
          <div className="admin-table-wrap">
            <table>
              <thead><tr><th>#</th><th>Product</th><th>Units Sold</th></tr></thead>
              <tbody>
                {stats.topProducts.map((p, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{p._id}</td>
                    <td><span className="badge badge-success">{p.totalSold} units</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
