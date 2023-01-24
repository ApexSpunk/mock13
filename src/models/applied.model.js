const mongoose = require('mongoose');

const appliedSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Applied = mongoose.model('Applied', appliedSchema);

module.exports = Applied;