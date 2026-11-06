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

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
  // Convertimos el parámetro de la URL (string) a número entero
  const idUsuario = parseInt(req.params.id);
  
  // Buscamos el índice exacto donde se encuentra el usuario en el arreglo
  const indice = usuarios.findIndex(u => u.id === idUsuario);
  
  // Si findIndex devuelve -1, significa que no encontró ningún usuario con ese ID
  if (indice === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  // Si lo encuentra, usamos splice para eliminar 1 elemento a partir de ese índice
  usuarios.splice(indice, 1);
  
  // Respondemos confirmando la acción
  res.json({ mensaje: `Usuario con ID ${idUsuario} eliminado correctamente` });
});

module.exports = router;