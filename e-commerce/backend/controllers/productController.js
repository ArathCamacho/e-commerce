const db = require("../config/db")

exports.obtenerProductoPorId = (req, res) => {
  const productId = req.params.id

  // Consulta con JOIN para obtener producto y sus variantes
  const query = `
    SELECT 
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      vp.color,
      vp.talla,
      vp.imagen,
      vp.stock
    FROM productos p
    LEFT JOIN variantes_producto vp ON p.id = vp.producto_id
    WHERE p.id = ?
    ORDER BY vp.color, vp.talla
  `

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error en consulta BD:", err)
      return res.status(500).json({ error: "Error en la consulta a la base de datos" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    // Si el producto existe pero no tiene variantes
    if (!results[0].color) {
      return res.json({
        id: results[0].id,
        nombre: results[0].nombre,
        descripcion: results[0].descripcion,
        precio: results[0].precio,
        variantes: [],
        tallasDisponibles: [],
      })
    }

    // Agrupamos las variantes por color
    const variantesPorColor = {}
    const todasLasTallas = new Set()

    results.forEach((row) => {
      const color = row.color

      if (!variantesPorColor[color]) {
        variantesPorColor[color] = {
          color: color,
          imagen: row.imagen,
          tallas: [],
        }
      }

      variantesPorColor[color].tallas.push({
        talla: row.talla,
        disponible: row.stock > 0,
        stock: row.stock,
      })

      todasLasTallas.add(row.talla)
    })

    // Convertimos el objeto a array
    const variantes = Object.values(variantesPorColor)

    // Creamos la respuesta estructurada
    const productoCompleto = {
      id: results[0].id,
      nombre: results[0].nombre,
      descripcion: results[0].descripcion,
      precio: results[0].precio,
      variantes: variantes,
      tallasDisponibles: Array.from(todasLasTallas).sort(),
    }

    res.json(productoCompleto)
  })
}

exports.obtenerTodosLosProductos = (req, res) => {
  // Para la lista de productos, podemos mostrar solo la información básica
  // o incluir una variante representativa de cada producto
  const query = `
    SELECT DISTINCT
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      (SELECT vp.imagen FROM variantes_producto vp WHERE vp.producto_id = p.id LIMIT 1) as imagen_principal
    FROM productos p
    LEFT JOIN variantes_producto vp ON p.id = vp.producto_id
  `

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error en consulta BD:", err)
      return res.status(500).json({ error: "Error en la consulta a la base de datos" })
    }

    res.json(results)
  })
}

// Nuevo endpoint para obtener variantes específicas (opcional)
exports.obtenerVariantesPorProducto = (req, res) => {
  const productId = req.params.id

  db.query(
    "SELECT * FROM variantes_producto WHERE producto_id = ? ORDER BY color, talla",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Error en consulta BD:", err)
        return res.status(500).json({ error: "Error en la consulta a la base de datos" })
      }

      res.json(results)
    },
  )
}
