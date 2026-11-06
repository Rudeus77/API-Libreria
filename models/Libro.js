const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  añoPublicacion: { type: Number, required: true },
  genero: { type: String, required: true }
});

module.exports = mongoose.model('Libro', libroSchema);