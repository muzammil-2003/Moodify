const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ['Happy', 'Laughing', 'Kissing', 'Concerned', 'Surprised'],
            message: 'Enum validation failed for path.'
        }
    }
})

const songModel = mongoose.model('song', songSchema)

module.exports = songModel