import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registrarse() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/register', {
        username,
        email,
        password,
      });

      // Redirigir al login después de registrar
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.error || 'Error al registrarse. Intenta nuevamente.'
      );
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
}

export default Registrarse;
