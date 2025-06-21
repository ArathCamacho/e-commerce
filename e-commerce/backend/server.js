const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // ← ✅ IMPORTAR

const app = express();

// Servir carpeta uploads para las imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api', productRoutes);
app.use('/api', authRoutes); // ← ✅ CONECTAR RUTAS DE AUTENTICACIÓN

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
