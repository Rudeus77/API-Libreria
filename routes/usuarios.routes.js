const express = require('express');
const router = express.Router();

// Arreglo en memoria para almacenar usuarios (se reinicia si apagas el servidor)
let usuarios = [
  { id: 1, nombre: "Rudy Hernandez", rol: "Admin" },
  { id: 2, nombre: "Julián Gonzales", rol: "Soporte TI" }
];

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const nuevoUsuario = {
    // Genera un ID autoincremental basado en el último elemento del arreglo
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre: req.body.nombre,
    rol: req.body.rol || 'Usuario Estándar'
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

module.exports = router;