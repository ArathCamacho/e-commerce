// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ruta para agregar un producto al carrito
router.post('/carrito', cartController.agregarAlCarrito);

// Ruta para obtener el contenido del carrito
router.get('/carrito/:sesion_id', cartController.obtenerCarrito);

module.exports = router;
