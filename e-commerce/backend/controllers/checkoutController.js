const db = require("../config/db")

// Obtener información de checkout del usuario
exports.obtenerInformacionCheckout = (req, res) => {
  const userId = req.user.id

  const query = `
    SELECT 
      telefono_contacto,
      calle_facturacion,
      ciudad_facturacion,
      estado_facturacion,
      codigo_postal_facturacion,
      pais_facturacion,
      nombre_envio,
      telefono_envio,
      calle_envio,
      ciudad_envio,
      estado_envio,
      codigo_postal_envio,
      pais_envio,
      misma_direccion_facturacion
    FROM informacion_checkout_usuario 
    WHERE usuario_id = ?
  `

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener información de checkout:", err)
      return res.status(500).json({ error: "Error al obtener información" })
    }

    if (results.length === 0) {
      // No hay información guardada, devolver estructura vacía
      return res.json({
        telefono_contacto: "",
        calle_facturacion: "",
        ciudad_facturacion: "",
        estado_facturacion: "",
        codigo_postal_facturacion: "",
        pais_facturacion: "México",
        nombre_envio: "",
        telefono_envio: "",
        calle_envio: "",
        ciudad_envio: "",
        estado_envio: "",
        codigo_postal_envio: "",
        pais_envio: "México",
        misma_direccion_facturacion: true,
      })
    }

    res.json(results[0])
  })
}

// Guardar o actualizar información de checkout
exports.guardarInformacionCheckout = (req, res) => {
  const userId = req.user.id
  const {
    telefono_contacto,
    calle_facturacion,
    ciudad_facturacion,
    estado_facturacion,
    codigo_postal_facturacion,
    pais_facturacion,
    nombre_envio,
    telefono_envio,
    calle_envio,
    ciudad_envio,
    estado_envio,
    codigo_postal_envio,
    pais_envio,
    misma_direccion_facturacion,
  } = req.body

  // Primero verificar si ya existe información para este usuario
  db.query("SELECT id FROM informacion_checkout_usuario WHERE usuario_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error al verificar información existente:", err)
      return res.status(500).json({ error: "Error en el servidor" })
    }

    if (results.length > 0) {
      // Actualizar información existente
      const updateQuery = `
          UPDATE informacion_checkout_usuario SET
            telefono_contacto = ?,
            calle_facturacion = ?,
            ciudad_facturacion = ?,
            estado_facturacion = ?,
            codigo_postal_facturacion = ?,
            pais_facturacion = ?,
            nombre_envio = ?,
            telefono_envio = ?,
            calle_envio = ?,
            ciudad_envio = ?,
            estado_envio = ?,
            codigo_postal_envio = ?,
            pais_envio = ?,
            misma_direccion_facturacion = ?,
            actualizado_en = CURRENT_TIMESTAMP
          WHERE usuario_id = ?
        `

      db.query(
        updateQuery,
        [
          telefono_contacto,
          calle_facturacion,
          ciudad_facturacion,
          estado_facturacion,
          codigo_postal_facturacion,
          pais_facturacion || "México",
          nombre_envio,
          telefono_envio,
          calle_envio,
          ciudad_envio,
          estado_envio,
          codigo_postal_envio,
          pais_envio || "México",
          misma_direccion_facturacion,
          userId,
        ],
        (err) => {
          if (err) {
            console.error("Error al actualizar información:", err)
            return res.status(500).json({ error: "Error al actualizar información" })
          }
          res.json({ message: "Información actualizada exitosamente" })
        },
      )
    } else {
      // Insertar nueva información
      const insertQuery = `
          INSERT INTO informacion_checkout_usuario (
            usuario_id,
            telefono_contacto,
            calle_facturacion,
            ciudad_facturacion,
            estado_facturacion,
            codigo_postal_facturacion,
            pais_facturacion,
            nombre_envio,
            telefono_envio,
            calle_envio,
            ciudad_envio,
            estado_envio,
            codigo_postal_envio,
            pais_envio,
            misma_direccion_facturacion
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

      db.query(
        insertQuery,
        [
          userId,
          telefono_contacto,
          calle_facturacion,
          ciudad_facturacion,
          estado_facturacion,
          codigo_postal_facturacion,
          pais_facturacion || "México",
          nombre_envio,
          telefono_envio,
          calle_envio,
          ciudad_envio,
          estado_envio,
          codigo_postal_envio,
          pais_envio || "México",
          misma_direccion_facturacion,
        ],
        (err) => {
          if (err) {
            console.error("Error al insertar información:", err)
            return res.status(500).json({ error: "Error al guardar información" })
          }
          res.json({ message: "Información guardada exitosamente" })
        },
      )
    }
  })
}
