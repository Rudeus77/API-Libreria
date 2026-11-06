const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Volvemos a pedir el ID manual
  nombre: { type: String, required: true },
  añoPublicacion: { type: Number, required: true },
  genero: { type: String, required: true }
});

module.exports = mongoose.model('Libro', libroSchema);