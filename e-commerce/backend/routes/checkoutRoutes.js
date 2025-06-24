const express = require("express")
const router = express.Router()
const checkoutController = require("../controllers/checkoutController")
const authenticateToken = require("../middlewares/authMiddleware")

// Obtener información de checkout del usuario (ruta protegida)
router.get("/checkout/info", authenticateToken, checkoutController.obtenerInformacionCheckout)

// Guardar información de checkout (ruta protegida)
router.post("/checkout/info", authenticateToken, checkoutController.guardarInformacionCheckout)

module.exports = router
