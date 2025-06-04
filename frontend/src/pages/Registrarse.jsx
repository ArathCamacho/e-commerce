// src/pages/Registrarse.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Registrarse() {
  return (
    <div>
      <h2>Registrarse</h2>
      <p>Formulario de registro aquí</p>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Registrarse;
