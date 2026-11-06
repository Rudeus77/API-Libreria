// Middleware para interceptar peticiones a rutas que no están definidas
const notFound = (req, res, next) => {
  // Devuelve un código de estado 404 y un mensaje de error en formato JSON
  res.status(404).json({ error: 'Ruta no encontrada' });
};

// Exportamos el middleware
module.exports = notFound;