const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// POST route for team members to create a review
router.post('/reviews/createReview', protect, restrictTo('team_member'), reviewController.createReview);

// PUT route for admins to approve/reject a review
router.put('/reviews/:reviewId', protect, restrictTo('admin'), reviewController.updateReview);

// GET route to fetch reviews for a specific product
router.get('/reviews/product/:productId', protect, reviewController.getReviewsByProduct);
router.get('/reviews/all', protect, reviewController.getAllReviews);
router.get('/reviews/myReview', protect, restrictTo('team_member'), reviewController.getMyReviews);

module.exports = router;
