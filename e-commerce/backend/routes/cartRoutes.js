const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

// Ruta para agregar un producto al carrito
router.post("/carrito", cartController.agregarAlCarrito)

// Ruta para obtener el contenido del carrito
router.get("/carrito/:sesion_id", cartController.obtenerCarrito)

// Ruta para actualizar cantidad
router.put("/carrito/cantidad", cartController.actualizarCantidad)

// Ruta para eliminar producto del carrito
router.delete("/carrito", cartController.eliminarDelCarrito)

module.exports = router
