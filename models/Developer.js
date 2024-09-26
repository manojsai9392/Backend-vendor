const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String], // Array of skills
        required: true
    },
    interests: {
        type: [String], // Array of interests
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Intermediate', 'Experienced'], // Enum for selection options
        required: true
    }
    // Additional fields like profile picture URL, etc.
});

module.exports = mongoose.model('Developer', developerSchema);
