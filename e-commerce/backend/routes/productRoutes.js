const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener producto por ID
router.get('/productos/:id', productController.obtenerProductoPorId);

// Obtener todos los productos
router.get('/productos', productController.obtenerTodosLosProductos);

module.exports = router;
