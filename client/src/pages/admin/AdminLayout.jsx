import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiPackage, FiShoppingBag, FiUsers, FiLogOut } from 'react-icons/fi';
import './AdminLayout.css';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: <FiGrid /> },
  { path: '/admin/products', label: 'Products', icon: <FiPackage /> },
  { path: '/admin/orders', label: 'Orders', icon: <FiShoppingBag /> },
  { path: '/admin/users', label: 'Users', icon: <FiUsers /> },
];

const AdminLayout = ({ children }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>⚡</span>
          <span>Shop<span>EZ</span></span>
          <span className="admin-tag">Admin</span>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-avatar">{user?.name?.charAt(0)}</div>
            <div>
              <p className="admin-user-name">{user?.name}</p>
              <p className="admin-user-role">Administrator</p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">
            <FiLogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
