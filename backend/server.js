const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // asegúrate que la ruta es correcta
const userRoutes = require('./routes/autentificacionRoutes'); // luego la crearemos

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/autentificacionRoutes');
app.use('/api', authRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
