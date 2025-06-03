const { body, validationResult } = require('express-validator');
const pool = require('../config/db'); // para consultar si el usuario existe

// Middleware de validación para registro
const validarRegistro = [
  // Validar formato del email
  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .custom(async (email) => {
      // Revisar si el email ya existe en la BD
      const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        throw new Error('El correo ya está registrado');
      }
      return true;
    }),

  // Validar longitud y fuerza de contraseña
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  // Aquí puedes agregar más validaciones para otros campos como username, etc.

  // Middleware para capturar errores de validación y responder
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validarRegistro
};
