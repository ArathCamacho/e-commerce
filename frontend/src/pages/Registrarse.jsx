import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/signUp.module.css';

function Registrarse() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/register', formData);

      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.error || 'Error al registrarse. Intenta nuevamente.'
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

        {/* Registration Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Regístrate</h2>
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

          <form onSubmit={handleRegister} className={styles.form}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Crear cuenta
            </button>
          </form>

          <div className={styles.loginLinkContainer}>
            <p className={styles.loginText}>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className={styles.loginLink}>
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;
