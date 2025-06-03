const express = require('express');
const router = express.Router();
const authController = require('../controllers/autentificacionController');
const { validarRegistro } = require('../middlewares/validarUsers');


router.post('/register', validarRegistro, authController.registerUser); // Middleware + controlador
router.post('/login', authController.loginUser); // Solo controlador

module.exports = router;
