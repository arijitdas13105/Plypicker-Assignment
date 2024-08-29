const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Use bcryptjs as it's sometimes more stable in various environments

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'team_member'],
        required: true
    }
});

// Pre-save hook to hash password only if it's new or has been modified
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
