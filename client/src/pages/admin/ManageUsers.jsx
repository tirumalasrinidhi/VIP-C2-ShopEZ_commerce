import { useState, useEffect } from 'react';
import { adminGetUsers, adminToggleUser } from '../../api/axios';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import { FiRefreshCw, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import './AdminLayout.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await adminGetUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggle = async (id) => {
    setTogglingId(id);
    try {
      const { data } = await adminToggleUser(id);
      setUsers(users.map(u => u._id === id ? { ...u, isActive: data.isActive } : u));
      toast.success(data.message);
    } catch {
      toast.error('Failed to update user');
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Manage Users</h1>
          <p>{users.length} registered customers</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchUsers}><FiRefreshCw size={14} /> Refresh</button>
      </div>

      {loading ? (
        <div className="loading-screen"><div className="spinner" /></div>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, color: '#fff', fontSize: '0.85rem', flexShrink: 0
                      }}>
                        {user.name?.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user.email}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user.phone || '—'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <span className={`badge ${user.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.isActive ? 'btn-danger' : 'btn-secondary'}`}
                      onClick={() => handleToggle(user._id)}
                      disabled={togglingId === user._id}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      {user.isActive
                        ? <><FiToggleRight size={14} /> Deactivate</>
                        : <><FiToggleLeft size={14} /> Activate</>
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageUsers;
