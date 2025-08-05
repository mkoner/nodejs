const mongoose = require('mongoose');
const permissions = require('../config/permissions');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    permissions: {
        type: [String],
        enum: Object.keys(permissions),
        default: ['READ_GAME'], 
    },
    refreshToken: {
        type: String,
        default: null,
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;