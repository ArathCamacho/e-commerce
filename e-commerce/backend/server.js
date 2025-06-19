// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api', cartRoutes);

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
