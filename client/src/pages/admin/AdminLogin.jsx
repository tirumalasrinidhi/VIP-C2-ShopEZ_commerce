import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../AuthPages.css';

const AdminLogin = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form);
    if (result.success) {
      if (result.data.role !== 'admin') {
        setError('Access denied. Admin only.');
        return;
      }
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" style={{ background: '#ff4757' }} />
        <div className="auth-orb auth-orb-2" />
      </div>
      <div className="auth-card card animate-scaleIn">
        <div className="auth-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
          <h1>Admin Portal</h1>
          <p>Sign in to access the ShopEZ dashboard</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email address</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input type="email" name="email" placeholder="admin@shopez.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrap">
              <FiLock className="input-icon" />
              <input type={showPw ? 'text' : 'password'} name="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              <button type="button" className="input-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? <><span className="spinner spinner-sm" /> Signing in...</> : 'Sign In as Admin'}
          </button>
        </form>

        <div className="demo-credentials" style={{ marginTop: '1.5rem' }}>
          <p className="demo-title">Admin Credentials</p>
          <p>🛡️ Email: <code>admin@shopez.com</code></p>
          <p>🔑 Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
