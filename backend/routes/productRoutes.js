const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getAllProducts)
    .post(protect, restrictTo('admin'), createProduct);

router.route('/:productId')
    .get(protect, getProduct)
    .put(protect, restrictTo('admin'), updateProduct)
    .delete(protect, restrictTo('admin'), deleteProduct);

module.exports = router;
