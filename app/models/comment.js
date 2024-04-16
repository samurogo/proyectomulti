// comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    descripcion: String,
    oferta: String,
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);