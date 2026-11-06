const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// Ruta GET para listar todos los libros o buscar por nombre
router.get('/', async (req, res) => {
  try {
    const { nombre } = req.query; // Extraemos el parámetro de consulta 'nombre' de la URL
    
    if (nombre) {
      // Si existe el parámetro, buscamos libros que coincidan (insensible a mayúsculas)
      const libros = await Libro.find({ nombre: new RegExp(nombre, 'i') });
      return res.json(libros); // Respondemos con los resultados de la búsqueda
    }
    
    // Si no hay parámetro de búsqueda, obtenemos todos los libros de la base de datos
    const libros = await Libro.find();
    res.json(libros); // Retornamos todos los libros en formato JSON
  } catch (error) {
    // Manejo de errores de base de datos
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// Obtener detalles de un libro por ID manual
router.get('/:id', async (req, res) => {
  try {
    // Convertimos req.params.id a número usando parseInt
    const libro = await Libro.findOne({ id: parseInt(req.params.id) });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
});

// Actualizar un libro por ID manual
router.put('/:id', async (req, res) => {
  try {
    // Convertimos req.params.id a número
    const libro = await Libro.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
});

// Eliminar un libro por ID manual
router.delete('/:id', async (req, res) => {
  try {
    // Convertimos req.params.id a número
    const libro = await Libro.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// Ruta POST para crear libros y poder poblar la base de datos
router.post('/', async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save(); // Guardamos el registro físicamente en MongoDB
    res.status(201).json(nuevoLibro); // Respondemos con el libro recién creado (Status 201)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el libro' });
  }
});

module.exports = router;