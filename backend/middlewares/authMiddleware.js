const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).send({ message: 'You are not logged in! Please log in to get access.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).send({ message: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token. Please log in again!' });
    }
};

// Middleware to restrict routes to certain roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles is an array like ['admin', 'team_member']
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ message: 'You do not have permission to perform this action.' });
        }
        next();
    };
};
