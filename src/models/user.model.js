const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;