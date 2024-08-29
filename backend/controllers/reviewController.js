const Review = require('../models/Review');
const Product = require('../models/Product');

// Create a review (when a team member submits changes)
// exports.createReview = async (req, res) => {
//     const { product, details } = req.body;
//     const author = req.user._id; // This assumes you are extracting user from JWT in middleware

//     try {
//         // Ensure the product exists
//         const existingProduct = await Product.findById(product);
//         if (!existingProduct) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const review = new Review({
//             product,
//             author,
//             details,
//             status: 'pending' // Default status
//         });

//         await review.save();
//         res.status(201).json({ message: "Review submitted successfully", review });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.createReview = async (req, res) => {
    const { product, comments, details } = req.body;
    const author = req.user._id; // Assuming you're extracting user from JWT in middleware

    try {
        // Ensure the product exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if a review already exists for this product by this author
        let review = await Review.findOne({ product: product, author: author });

        if (review) {
            // Update the existing review
            review.details = details;
            review.comments = comments;
            review.status = 'pending'; // Reset status to pending on new updates
        } else {
            // Create a new review if none exists
            review = new Review({
                product,
                author,
                details,
                comments,
                status: 'pending' // Default status
            });
        }

        await review.save();
        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a review (when an admin approves or rejects it)
// exports.updateReview = async (req, res) => {
//     const { reviewId } = req.params;
//     const { status } = req.body; // 'approved' or 'rejected'

//     try {
//         const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });
//         if (!review) {
//             return res.status(404).json({ message: "Review not found" });
//         }
//         res.status(200).json({ message: "Review updated successfully", review });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// Update a review (when an admin approves or rejects it) and update product if approved
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    try {
        const review = await Review.findById(reviewId).populate('product');
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Update the review status
        review.status = status;
        await review.save();

        // If the review is approved, update the product details
        if (status === 'approved') {
            const productUpdate = {
                name: review.details.name,
                description: review.details.description,
                image: review.details.image,
                price: review.details.price
            };
            await Product.findByIdAndUpdate(review.product._id, productUpdate, { new: true });
        }

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ product: productId }).populate('author', 'email');
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).populate('product', 'name').populate('author', 'email');
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};



exports.getMyReviews = async (req, res) => {
    const authorId = req.user._id; // Extract the user ID from the JWT payload

    try {
        const myReviews = await Review.find({ author: authorId }).populate('product', 'name');
        res.status(200).json({ success: true, reviews: myReviews });
    } catch (error) {
        console.error("Error fetching user's reviews:", error);
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};
