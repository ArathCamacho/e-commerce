const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // por ejemplo: 'root'
  password: 'Halo_2017', // si tienes
  database: 'ecommerce'
});
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión exitosa a la base de datos MySQL.');
  }
});

module.exports = connection;
//poner en algun archivo donde quiera acceder a la bd:
//const db = require('../db');

