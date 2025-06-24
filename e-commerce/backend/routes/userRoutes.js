const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authenticateToken = require("../middlewares/authMiddleware")

// Obtener detalles completos del usuario (ruta protegida)
router.get("/users/:id", authenticateToken, userController.obtenerDetallesUsuario)

module.exports = router
