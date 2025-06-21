const db = require("../config/db")

// Agregar producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const { producto_id, color, talla, cantidad, sesion_id } = req.body

  if (!producto_id || !color || !talla || !cantidad || !sesion_id) {
    return res.status(400).json({ error: "Faltan datos necesarios" })
  }

  // Primero encontramos la variante específica
  db.query(
    "SELECT id, stock FROM variantes_producto WHERE producto_id = ? AND color = ? AND talla = ?",
    [producto_id, color, talla],
    (err, variantes) => {
      if (err) {
        console.error("Error al buscar variante:", err)
        return res.status(500).json({ error: "Error en la consulta" })
      }

      if (variantes.length === 0) {
        return res.status(404).json({ error: "Variante de producto no encontrada" })
      }

      const variante = variantes[0]

      // Verificar stock disponible
      if (variante.stock < cantidad) {
        return res.status(400).json({ error: "Stock insuficiente", stockDisponible: variante.stock })
      }

      // Verificar si la variante ya está en el carrito
      db.query(
        "SELECT * FROM carrito WHERE sesion_id = ? AND variante_id = ?",
        [sesion_id, variante.id],
        (err, results) => {
          if (err) {
            console.error("Error al verificar carrito:", err)
            return res.status(500).json({ error: "Error en la consulta" })
          }

          if (results.length > 0) {
            // Ya existe: actualizar cantidad
            const nuevaCantidad = results[0].cantidad + cantidad

            // Verificar que la nueva cantidad no exceda el stock
            if (nuevaCantidad > variante.stock) {
              return res.status(400).json({
                error: "La cantidad total excede el stock disponible",
                stockDisponible: variante.stock,
                cantidadActual: results[0].cantidad,
              })
            }

            db.query(
              "UPDATE carrito SET cantidad = ? WHERE sesion_id = ? AND variante_id = ?",
              [nuevaCantidad, sesion_id, variante.id],
              (err) => {
                if (err) {
                  console.error("Error al actualizar cantidad:", err)
                  return res.status(500).json({ error: "Error al actualizar cantidad" })
                }
                res.json({ message: "Cantidad actualizada en el carrito", nuevaCantidad })
              },
            )
          } else {
            // No existe: insertar nuevo
            db.query(
              "INSERT INTO carrito (sesion_id, variante_id, cantidad) VALUES (?, ?, ?)",
              [sesion_id, variante.id, cantidad],
              (err) => {
                if (err) {
                  console.error("Error al agregar al carrito:", err)
                  return res.status(500).json({ error: "Error al agregar al carrito" })
                }
                res.json({ message: "Producto agregado al carrito" })
              },
            )
          }
        },
      )
    },
  )
}

// Obtener productos del carrito
exports.obtenerCarrito = (req, res) => {
  const sesion_id = req.params.sesion_id

  const query = `
    SELECT 
      c.id as carrito_id,
      c.cantidad,
      c.fecha_agregado,
      p.id as producto_id,
      p.nombre,
      p.descripcion,
      p.precio,
      vp.id as variante_id,
      vp.color,
      vp.talla,
      vp.imagen,
      vp.stock
    FROM carrito c
    JOIN variantes_producto vp ON c.variante_id = vp.id
    JOIN productos p ON vp.producto_id = p.id
    WHERE c.sesion_id = ?
    ORDER BY c.fecha_agregado DESC
  `

  db.query(query, [sesion_id], (err, results) => {
    if (err) {
      console.error("Error al obtener el carrito:", err)
      return res.status(500).json({ error: "Error al obtener el carrito" })
    }

    // Formatear los resultados para el frontend
    const cartItems = results.map((item) => ({
      id: item.carrito_id,
      producto_id: item.producto_id,
      variante_id: item.variante_id,
      name: item.nombre,
      price: Number.parseFloat(item.precio),
      color: item.color,
      size: item.talla,
      quantity: item.cantidad,
      image: `http://localhost:3001/${item.imagen}`,
      stock: item.stock,
      sku: `${item.producto_id.toString().padStart(3, "0")}-${item.variante_id}`,
    }))

    res.json(cartItems)
  })
}

// Actualizar cantidad en el carrito
exports.actualizarCantidad = (req, res) => {
  const { carrito_id, nueva_cantidad, sesion_id } = req.body

  if (!carrito_id || !nueva_cantidad || !sesion_id) {
    return res.status(400).json({ error: "Faltan datos necesarios" })
  }

  if (nueva_cantidad < 1) {
    return res.status(400).json({ error: "La cantidad debe ser mayor a 0" })
  }

  // Verificar stock disponible
  const queryStock = `
    SELECT vp.stock, c.variante_id
    FROM carrito c
    JOIN variantes_producto vp ON c.variante_id = vp.id
    WHERE c.id = ? AND c.sesion_id = ?
  `

  db.query(queryStock, [carrito_id, sesion_id], (err, results) => {
    if (err) {
      console.error("Error al verificar stock:", err)
      return res.status(500).json({ error: "Error al verificar stock" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Item del carrito no encontrado" })
    }

    const stockDisponible = results[0].stock

    if (nueva_cantidad > stockDisponible) {
      return res.status(400).json({ error: "Stock insuficiente", stockDisponible })
    }

    // Actualizar cantidad
    db.query(
      "UPDATE carrito SET cantidad = ? WHERE id = ? AND sesion_id = ?",
      [nueva_cantidad, carrito_id, sesion_id],
      (err) => {
        if (err) {
          console.error("Error al actualizar cantidad:", err)
          return res.status(500).json({ error: "Error al actualizar cantidad" })
        }
        res.json({ message: "Cantidad actualizada", nueva_cantidad })
      },
    )
  })
}

// Eliminar producto del carrito
exports.eliminarDelCarrito = (req, res) => {
  const { carrito_id, sesion_id } = req.body

  db.query("DELETE FROM carrito WHERE id = ? AND sesion_id = ?", [carrito_id, sesion_id], (err) => {
    if (err) {
      console.error("Error al eliminar producto:", err)
      return res.status(500).json({ error: "Error al eliminar producto" })
    }
    res.json({ message: "Producto eliminado del carrito" })
  })
}
