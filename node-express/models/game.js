const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    platform: {
        type: [String],
        required: true,
        enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'],
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;