// controllers/authController.js
const db = require("../config/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Usar la misma clave que el middleware
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_muy_segura"

// Registro de usuario
exports.register = (req, res) => {
  const { username, email, password } = req.body

  // Encriptar la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10)

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error("Error al registrar:", err)
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "El email ya está registrado" })
        }
        return res.status(500).json({ error: "Error al registrar usuario" })
      }

      // Generar token para el nuevo usuario
      const userId = result.insertId
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "24h" })

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        token,
        user: {
          id: userId,
          username,
          email,
        },
      })
    },
  )
}

// Inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err)
      return res.status(500).json({ error: "Error en el servidor" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const user = results[0]

    // Comparar contraseñas
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" })
    }

    // Generar token con mayor duración
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" })

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  })
}

// Verificar token (para mantener sesión)
exports.verifyToken = (req, res) => {
  // El middleware ya verificó el token, solo devolvemos la info del usuario
  const userId = req.user.id

  db.query("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener usuario:", err)
      return res.status(500).json({ error: "Error en el servidor" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const user = results[0]
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  })
}
