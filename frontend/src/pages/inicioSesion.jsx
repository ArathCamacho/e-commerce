import React, { useState } from 'react';

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí pondrías la lógica para enviar el formulario, 
    // por ejemplo llamar a la API para login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="email">Correo electrónico:</label><br />
          <input
            type="email"
            id="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
    
  );

}

export default InicioSesion;
