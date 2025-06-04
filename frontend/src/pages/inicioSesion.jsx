// src/pages/InicioSesion.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/signUp.module.css';

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
    <div className={styles.fullScreenContainer}>
      <div className={styles.formWrapper}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <span className={styles.logoLetter}>V</span>
          </div>
          <span className={styles.logoText}>
            <span className={styles.logoTextGreen}>VAND</span>
            <span className={styles.logoTextBold}>ENTIALS</span>
          </span>
        </div>

        {/* Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Iniciar Sesión</h2>

          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoComplete="username"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                autoComplete="current-password"
              />
            </div>

            {/* Forgot password link */}
            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={styles.loginLink}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className={styles.submitButton}>
              Iniciar Sesión
            </button>
          </form>

          <div className={styles.loginLinkContainer}>
            <p className={styles.loginText}>
              ¿No tienes cuenta?{' '}
              <Link to="/register" className={styles.loginLink}>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InicioSesion;
