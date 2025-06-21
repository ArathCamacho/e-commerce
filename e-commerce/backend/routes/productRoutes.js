const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

// Obtener producto por ID con sus variantes
router.get("/productos/:id", productController.obtenerProductoPorId)

// Obtener todos los productos
router.get("/productos", productController.obtenerTodosLosProductos)

// Obtener solo las variantes de un producto (endpoint adicional)
router.get("/productos/:id/variantes", productController.obtenerVariantesPorProducto)

module.exports = router
