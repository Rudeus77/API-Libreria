const express = require('express');
const mongoose = require('mongoose');
const librosRoutes = require('./routes/libros.routes');
const notFound = require('./middlewares/notFound');

// Inicialización de la aplicación Express
const app = express();
const PORT = 3000;
const usuariosRoutes = require('./routes/usuarios.routes'); 

// Middleware integrado de Express para parsear los cuerpos de las peticiones a JSON
app.use(express.json());

// Conexión a MongoDB (Creará la BD 'api_libros' automáticamente al insertar datos)
mongoose.connect('mongodb://127.0.0.1:27017/biblioteca')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Montamos las rutas de libros bajo el prefijo '/api/libros'
// Cualquier petición a '/api/libros' será manejada por libros.routes.js
app.use('/api/libros', librosRoutes);
app.use('/api/usuarios', usuariosRoutes); 

// Middleware para manejar los errores 404 en caso de ingresar una URL incorrecta
app.use(notFound);

// Iniciamos el servidor para que escuche en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor de Libros corriendo en http://localhost:${PORT}`);
});

