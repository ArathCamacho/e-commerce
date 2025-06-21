const db = require('../config/db');

// Agregar producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const { producto_id, cantidad, sesion_id } = req.body;

  if (!producto_id || !cantidad || !sesion_id) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  // Verificar si el producto ya está en el carrito
  db.query(
    'SELECT * FROM carrito WHERE sesion_id = ? AND producto_id = ?',
    [sesion_id, producto_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la consulta' });

      if (results.length > 0) {
        // Ya existe: actualizar cantidad
        const nuevaCantidad = results[0].cantidad + cantidad;
        db.query(
          'UPDATE carrito SET cantidad = ? WHERE sesion_id = ? AND producto_id = ?',
          [nuevaCantidad, sesion_id, producto_id],
          (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar cantidad' });
            res.json({ message: 'Producto actualizado en el carrito' });
          }
        );
      } else {
        // No existe: insertar nuevo
        db.query(
          'INSERT INTO carrito (sesion_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [sesion_id, producto_id, cantidad],
          (err) => {
            if (err) return res.status(500).json({ error: 'Error al agregar al carrito' });
            res.json({ message: 'Producto agregado al carrito' });
          }
        );
      }
    }
  );
};

// Obtener productos del carrito
exports.obtenerCarrito = (req, res) => {
  const sesion_id = req.params.sesion_id;

  db.query(
    `SELECT c.id, c.cantidad, p.nombre, p.color, p.talla, p.precio, p.imagen
     FROM carrito c
     JOIN productos p ON c.producto_id = p.id
     WHERE c.sesion_id = ?`,
    [sesion_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el carrito' });
      res.json(results);
    }
  );
};

// Eliminar producto del carrito (opcional)
exports.eliminarDelCarrito = (req, res) => {
  const { producto_id, sesion_id } = req.body;

  db.query(
    'DELETE FROM carrito WHERE sesion_id = ? AND producto_id = ?',
    [sesion_id, producto_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar producto' });
      res.json({ message: 'Producto eliminado del carrito' });
    }
  );
};
