const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    details: {   // Previously just a string, now an object to hold various details
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
    },
    comments: { type: String },  // Additional field for any comments or notes
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
