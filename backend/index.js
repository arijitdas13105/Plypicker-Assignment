require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


const app = express();
const PORT = process.env.PORT || 3000;  
// MongoDB Connection URL
// const MONGO_URI = 'mongodb+srv://arijitdasofficial05:Q7Wvs059k9xZhJhm@cluster0.aoeky.mongodb.net/';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products', reviewRoutes);



// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
