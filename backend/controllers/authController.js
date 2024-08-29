const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Helper function to sign JWT token
const signToken = id => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '90d' });
};

// User registration
exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const newUser = await User.create({
            email,
            password,  // Directly pass the password, let the model handle hashing
            role
        });

        const token = signToken(newUser._id);
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
            // email,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token. Please log in again!' });
    }
};
