// src/pages/InicioSesion.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './inicioSesionStyle.css';

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/principal');
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.error || 'Error al iniciar sesión. Intenta nuevamente.'
      );
    }
  };

  return (
    <div className="form-container">
      <img src="./src/assets/VANDENTIALS-LOGO.png" alt="Logo" className="logo" />
      <h2>Iniciar Sesión</h2>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          autoComplete="current-password"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="signup-text">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default InicioSesion;
