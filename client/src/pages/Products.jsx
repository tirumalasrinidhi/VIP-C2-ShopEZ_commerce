import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api/axios';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import './Products.css';

const SORT_OPTIONS = [
  { value: '', label: 'Relevance' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filterOpen, setFilterOpen] = useState(false);

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [filters, setFilters] = useState({ keyword, category, sort, minPrice: '', maxPrice: '' });

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = { page };
        if (keyword) params.keyword = keyword;
        if (category) params.category = category;
        if (sort) params.sort = sort;
        const { data } = await getProducts(params);
        setProducts(data.products);
        setPagination({ page: data.page, pages: data.pages, total: data.total });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [searchParams]);

  const applyFilters = () => {
    const params = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category) params.category = filters.category;
    if (filters.sort) params.sort = filters.sort;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    setSearchParams(params);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({ keyword: '', category: '', sort: '', minPrice: '', maxPrice: '' });
    setSearchParams({});
  };

  const setPage = (p) => {
    const params = Object.fromEntries(searchParams);
    setSearchParams({ ...params, page: p });
  };

  const hasFilters = keyword || category || sort;

  return (
    <div className="products-page page-content">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div>
            <h1 className="section-title">
              {category || keyword ? (category || `"${keyword}"`) : 'All Products'}
            </h1>
            <p className="section-subtitle">{pagination.total} products found</p>
          </div>
          <div className="products-toolbar">
            <select
              className="sort-select"
              value={filters.sort}
              onChange={(e) => { setFilters({ ...filters, sort: e.target.value }); }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button className="btn btn-secondary" onClick={() => setFilterOpen(!filterOpen)}>
              <FiFilter size={16} /> Filters
            </button>
            {hasFilters && (
              <button className="btn btn-danger btn-sm" onClick={clearFilters}>
                <FiX size={16} /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filter-sidebar card ${filterOpen ? 'open' : ''}`}>
            <div className="filter-header">
              <h3>Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="filter-close"><FiX /></button>
            </div>

            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <div className="cat-list">
                <button
                  className={`cat-item ${!filters.category ? 'active' : ''}`}
                  onClick={() => setFilters({ ...filters, category: '' })}
                >All</button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`cat-item ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => setFilters({ ...filters, category: cat })}
                  >{cat}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range (₹)</label>
              <div className="price-range">
                <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                <span style={{ color: 'var(--text-muted)' }}>—</span>
                <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={applyFilters}>Apply Filters</button>
          </aside>

          {/* Product Grid */}
          <div className="products-main">
            {loading ? (
              <div className="loading-screen">
                <div className="spinner" />
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn btn-primary" onClick={clearFilters} style={{ marginTop: '1rem' }}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((p, i) => (
                    <div key={p._id} style={{ animation: `fadeInUp 0.35s ease ${i * 0.05}s both` }}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        className={`page-btn ${p === pagination.page ? 'active' : ''}`}
                        onClick={() => setPage(p)}
                      >{p}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
