// src/pages/PaginaPrincipal.jsx
import React from 'react';

function PaginaPrincipal() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Bienvenido, {user?.nombre} 👋</h1>
      <p>Has iniciado sesión correctamente.</p>
    </div>
  );
}

export default PaginaPrincipal;
