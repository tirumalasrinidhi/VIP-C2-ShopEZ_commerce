import axios from 'axios';

// Use VITE_API_URL in production (Vercel → Render), fallback to /api for local dev (proxied by Vite)
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('shopez_user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getFeaturedProducts = () => API.get('/products/featured');
export const getProductById = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get('/products/categories');
export const createReview = (id, data) => API.post(`/products/${id}/reviews`, data);

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (itemId, data) => API.put(`/cart/${itemId}`, data);
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);
export const clearCart = () => API.delete('/cart');

// Orders
export const placeOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders');
export const getOrderById = (id) => API.get(`/orders/${id}`);

// Admin
export const getAdminStats = () => API.get('/admin/stats');
export const adminGetProducts = () => API.get('/admin/products');
export const adminCreateProduct = (data) => API.post('/admin/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const adminUpdateProduct = (id, data) => API.put(`/admin/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const adminDeleteProduct = (id) => API.delete(`/admin/products/${id}`);
export const adminGetOrders = () => API.get('/admin/orders');
export const adminUpdateOrder = (id, data) => API.put(`/admin/orders/${id}`, data);
export const adminGetUsers = () => API.get('/admin/users');
export const adminToggleUser = (id) => API.put(`/admin/users/${id}`);

export default API;
