const express = require('express');
const router = express.Router();
const {
  getProducts, getFeaturedProducts, getProductById, createReview, getCategories
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createReview);

module.exports = router;
