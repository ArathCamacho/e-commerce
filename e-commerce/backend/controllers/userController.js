const db = require("../config/db")

// Obtener detalles completos del usuario
exports.obtenerDetallesUsuario = (req, res) => {
  const userId = req.params.id
  const userIdFromToken = req.user?.id // Asumiendo que tienes middleware de auth

  // Verificar que el usuario solo pueda acceder a sus propios datos
  if (Number.parseInt(userId) !== userIdFromToken) {
    return res.status(403).json({ error: "No autorizado" })
  }

  const query = `
    SELECT 
      u.id,
      u.username,
      u.email,
      u.telefono,
      u.created_at as fecha_registro,
      d.calle,
      d.ciudad,
      d.estado,
      d.codigo_postal as codigoPostal,
      d.pais
    FROM users u
    LEFT JOIN direcciones_usuario d ON u.id = d.usuario_id
    WHERE u.id = ?
  `

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener detalles del usuario:", err)
      return res.status(500).json({ error: "Error en la consulta" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const user = results[0]

    // Estructurar la respuesta
    const userDetails = {
      id: user.id,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      fecha_registro: user.fecha_registro,
      direccion: user.calle
        ? {
            calle: user.calle,
            ciudad: user.ciudad,
            estado: user.estado,
            codigoPostal: user.codigoPostal,
            pais: user.pais,
          }
        : null,
    }

    res.json(userDetails)
  })
}
