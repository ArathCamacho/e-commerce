// routes/authRoutes.js
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const authenticateToken = require("../middlewares/authMiddleware")

// Ruta para registrar
router.post("/register", authController.register)

// Ruta para iniciar sesión
router.post("/login", authController.login)

// Ruta para verificar token (mantener sesión)
router.get("/verify-token", authenticateToken, authController.verifyToken)

module.exports = router
