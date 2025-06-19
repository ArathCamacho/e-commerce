// controllers/cartController.js
const db = require('../config/db');

// Agregar producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const { producto_id, cantidad, sesion_id } = req.body;

  const checkQuery = 'SELECT * FROM carrito WHERE producto_id = ? AND sesion_id = ?';
  db.query(checkQuery, [producto_id, sesion_id], (err, results) => {
    if (err) {
      console.error('Error al verificar producto en carrito:', err);
      return res.status(500).json({ error: 'Error al consultar el carrito' });
    }

    if (results.length > 0) {
      const nuevaCantidad = results[0].cantidad + cantidad;
      const updateQuery = 'UPDATE carrito SET cantidad = ? WHERE producto_id = ? AND sesion_id = ?';
      db.query(updateQuery, [nuevaCantidad, producto_id, sesion_id], (err) => {
        if (err) {
          console.error('Error al actualizar cantidad:', err);
          return res.status(500).json({ error: 'Error al actualizar cantidad en carrito' });
        }
        res.json({ message: 'Cantidad actualizada en carrito' });
      });
    } else {
      const insertQuery = 'INSERT INTO carrito (producto_id, cantidad, sesion_id) VALUES (?, ?, ?)';
      db.query(insertQuery, [producto_id, cantidad, sesion_id], (err) => {
        if (err) {
          console.error('Error al agregar al carrito:', err);
          return res.status(500).json({ error: 'Error al agregar producto al carrito' });
        }
        res.status(201).json({ message: 'Producto agregado al carrito' });
      });
    }
  });
};

// Obtener productos del carrito
exports.obtenerCarrito = (req, res) => {
  const { sesion_id } = req.params;

  const query = `
    SELECT c.id, c.cantidad, p.nombre, p.precio, p.color, p.talla, p.imagen
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    WHERE c.sesion_id = ?
  `;
  db.query(query, [sesion_id], (err, results) => {
    if (err) {
      console.error('Error al obtener carrito:', err);
      return res.status(500).json({ error: 'Error al obtener productos del carrito' });
    }

    res.json(results);
  });
};
