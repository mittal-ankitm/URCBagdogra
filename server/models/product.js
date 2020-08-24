const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    maxQuantity: {
        type: Number,
        min: 1,
        max: 24
    },
    category: {
        type: String,
        default: ''
    },
    onlinePercent: {
        type: Number,
        min: 1,
        max: 100,
        default: 100
    }
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;