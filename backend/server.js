const express = require('express');
const app = express();
const port = 3001;  // El puerto donde estará corriendo tu API

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor Express!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});