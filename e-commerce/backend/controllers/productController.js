const db = require('../config/db');

exports.obtenerProductoPorId = (req, res) => {
  const productId = req.params.id;

  db.query('SELECT * FROM productos WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error en consulta BD:', err);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(results[0]);
  });
};

exports.obtenerTodosLosProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error en consulta BD:', err);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }

    res.json(results);
  });
};
