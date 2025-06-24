"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { useTheme } from "./context/themeContext"
import { useAuth } from "./context/AuthContext"
import styles from "./styles/login.module.css"

const ArrowLeft = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="m19 12H5" />
  </svg>
)

export default function InicioSesion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [currentError, setCurrentError] = useState("")
  const { darkMode, mounted } = useTheme()
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Obtener parámetro de redirección
  const redirectTo = searchParams.get("redirect")

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated()) {
      if (redirectTo === "checkout") {
        navigate("/checkout")
      } else {
        navigate("/principal")
      }
    }
  }, [isAuthenticated, navigate, redirectTo])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setCurrentError("email-empty")
      return
    }

    if (!isValidEmail(email)) {
      setCurrentError("email-invalid")
      return
    }

    if (!password.trim()) {
      setCurrentError("password")
      return
    }

    setCurrentError("")

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        login(data.user, data.token) // Usar el contexto de autenticación

        // Redirigir según el parámetro
        if (redirectTo === "checkout") {
          navigate("/checkout")
        } else {
          navigate("/principal")
        }
      } else {
        const errorData = await response.json()
        setErrorMsg(errorData.error || "Error al iniciar sesión")
      }
    } catch (error) {
      console.error(error)
      setErrorMsg("Error al iniciar sesión. Intenta nuevamente.")
    }
  }

  const handleGoogleLogin = () => {
    console.log("Iniciar sesión con Google")
  }

  const clearCurrentError = () => {
    setCurrentError("")
  }

  const getErrorMessage = (field) => {
    const messages = {
      "email-empty": "Por favor ingresa tu correo electrónico",
      "email-invalid": "Por favor ingresa un correo electrónico válido",
      password: "Por favor ingresa tu contraseña",
    }
    return messages[field] || ""
  }

  const saveEmailToStorage = (email) => {
    if (!email.trim() || !email.includes("@")) return

    try {
      const savedEmails = JSON.parse(localStorage.getItem("vandentials_emails") || "[]")
      const updatedEmails = [email, ...savedEmails.filter((e) => e !== email)].slice(0, 10)
      localStorage.setItem("vandentials_emails", JSON.stringify(updatedEmails))
    } catch (error) {
      console.error("Error guardando email:", error)
    }
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    if (currentError === "email-empty" || currentError === "email-invalid") {
      clearCurrentError()
    }
  }

  const handleEmailBlur = () => {
    if (email.includes("@")) {
      saveEmailToStorage(email)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`${styles.fullScreenContainer} ${darkMode ? "dark" : ""}`}>
      <button onClick={() => navigate("/")} className={styles.backButton} aria-label="Volver al inicio">
        <ArrowLeft size={28} />
      </button>
      <div className={`${styles.formWrapper} ${darkMode ? "dark" : ""}`}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <span className={styles.logoLetter}>V</span>
          </div>
          <span className={styles.logoText}>
            <span className={`${styles.logoTextGreen} ${darkMode ? "dark" : ""}`}>VAND</span>
            <span className={`${styles.logoTextBold} ${darkMode ? "dark" : ""}`}>ENTIALS</span>
          </span>
        </div>

        {/* Formulario */}
        <div className={styles.formContainer}>
          <h2 className={`${styles.formTitle} ${darkMode ? "dark" : ""}`}>Iniciar Sesión</h2>

          {/* Mensaje informativo si viene del carrito */}
          {redirectTo === "checkout" && (
            <div className={styles.redirectMessage}>
              <p>Inicia sesión para continuar con tu compra</p>
            </div>
          )}

          {errorMsg && <p className={`${styles.errorMsg} ${darkMode ? "dark" : ""}`}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} className={styles.form} autoComplete="off" noValidate>
            <div className={styles.inputGroup}>
              {(currentError === "email-empty" || currentError === "email-invalid") && (
                <div className={`${styles.customNotification} ${darkMode ? "dark" : ""}`}>
                  <span>{getErrorMessage(currentError)}</span>
                  <button type="button" className={styles.closeButton} onClick={clearCurrentError}>
                    ×
                  </button>
                </div>
              )}
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`${styles.input} ${darkMode ? "dark" : ""}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-lpignore="true"
                data-form-type="other"
              />
            </div>

            <div className={styles.inputGroup}>
              {currentError === "password" && (
                <div className={`${styles.customNotification} ${darkMode ? "dark" : ""}`}>
                  <span>{getErrorMessage("password")}</span>
                  <button type="button" className={styles.closeButton} onClick={clearCurrentError}>
                    ×
                  </button>
                </div>
              )}
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (currentError === "password") {
                    clearCurrentError()
                  }
                }}
                className={`${styles.input} ${darkMode ? "dark" : ""}`}
                autoComplete="off"
                data-lpignore="true"
              />
            </div>

            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={`${styles.loginLink} ${darkMode ? "dark" : ""}`}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className={`${styles.submitButton} ${darkMode ? "dark" : ""}`}>
              Iniciar Sesión
            </button>

            <div className={styles.divider}>
              <span className={`${styles.dividerText} ${darkMode ? "dark" : ""}`}>o</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`${styles.googleButton} ${darkMode ? "dark" : ""}`}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>
          </form>

          <div className={styles.loginLinkContainer}>
            <p className={`${styles.loginText} ${darkMode ? "dark" : ""}`}>
              ¿No tienes cuenta?{" "}
              <Link
                to={`/register${redirectTo ? `?redirect=${redirectTo}` : ""}`}
                className={`${styles.loginLink} ${darkMode ? "dark" : ""}`}
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
