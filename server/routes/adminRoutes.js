const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  adminGetProducts, createProduct, updateProduct, deleteProduct,
  adminGetOrders, updateOrderStatus,
  adminGetUsers, toggleUserStatus,
  upload
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.use(protect, adminOnly);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Product management
router.get('/products', adminGetProducts);
router.post('/products', upload.array('images', 5), createProduct);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);

// Order management
router.get('/orders', adminGetOrders);
router.put('/orders/:id', updateOrderStatus);

// User management
router.get('/users', adminGetUsers);
router.put('/users/:id', toggleUserStatus);

module.exports = router;
