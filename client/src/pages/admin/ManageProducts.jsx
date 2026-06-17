import { useState, useEffect } from 'react';
import { adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '../../api/axios';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit3, FiTrash2, FiX, FiImage } from 'react-icons/fi';
import './AdminLayout.css';

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'];

const emptyForm = { name: '', description: '', price: '', discount: '0', category: 'Electronics', brand: '', stock: '', isFeatured: false, images: [] };

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await adminGetProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setImageFiles([]);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name, description: p.description, price: p.price, discount: p.discount,
      category: p.category, brand: p.brand, stock: p.stock, isFeatured: p.isFeatured, isActive: p.isActive
    });
    setImageFiles([]);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      imageFiles.forEach(f => fd.append('images', f));

      if (editProduct) {
        const { data } = await adminUpdateProduct(editProduct._id, fd);
        setProducts(products.map(p => p._id === editProduct._id ? data : p));
        toast.success('Product updated');
      } else {
        const { data } = await adminCreateProduct(fd);
        setProducts([data, ...products]);
        toast.success('Product created');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      await adminDeleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Manage Products</h1>
          <p>{products.length} products in catalog</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="loading-screen"><div className="spinner" /></div>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const imgUrl = p.images?.[0]?.startsWith('http') ? p.images[0] : p.images?.[0] ? `http://localhost:5000${p.images[0]}` : null;
                const dp = p.price - (p.price * p.discount / 100);
                return (
                  <tr key={p._id}>
                    <td>
                      {imgUrl ? (
                        <img src={imgUrl} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      ) : (
                        <div style={{ width: 48, height: 48, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                          <FiImage size={18} />
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                      {p.brand && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.brand}</div>}
                    </td>
                    <td><span className="badge badge-primary">{p.category}</span></td>
                    <td style={{ fontWeight: 600 }}>₹{dp.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td>{p.discount > 0 ? <span className="badge badge-success">-{p.discount}%</span> : '—'}</td>
                    <td style={{ color: p.stock < 5 ? '#ff6b81' : 'var(--text-secondary)', fontWeight: p.stock < 5 ? 700 : 400 }}>{p.stock}</td>
                    <td>
                      <span className={`badge ${p.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {p.isActive ? 'Active' : 'Hidden'}
                      </span>
                      {p.isFeatured && <span className="badge badge-warning" style={{ marginLeft: 4 }}>Featured</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)} title="Edit"><FiEdit3 size={14} /></button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p._id)}
                          disabled={deletingId === p._id}
                          title="Delete"
                        ><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="modal animate-scaleIn">
            <div className="modal-header">
              <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="modal-close" onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input type="number" required min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount (%)</label>
                  <input type="number" min="0" max="100" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock *</label>
                  <input type="number" required min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} style={{ width: 'auto' }} />
                  Featured Product
                </label>
                {editProduct && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 'auto' }} />
                    Active (visible)
                  </label>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Product Images</label>
                <input type="file" accept="image/*" multiple onChange={e => setImageFiles(Array.from(e.target.files))} style={{ padding: '0.5rem' }} />
                {imageFiles.length > 0 && <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{imageFiles.length} file(s) selected</p>}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 1 }}>
                  {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageProducts;
