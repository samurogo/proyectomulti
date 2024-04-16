const mongoose = require('mongoose');

const apartadoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    marca: String,
    talla: String,
    descripcion: String,
    cantidad: {
        type: Number,
        default: 1 // Valor por defecto para la cantidad
    },
    userId: {
        type: String,
        ref: 'User'
    },
    productId: {
        type: String,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Apartado', apartadoSchema);
