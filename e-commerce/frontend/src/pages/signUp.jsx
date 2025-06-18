
import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import styles from "./styles/signup.module.css"
import { useTheme } from "./context/themeContext"

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

export default function Registrarse() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [currentError, setCurrentError] = useState("")
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })
  const passwordRef = useRef(null)
  const navigate = useNavigate()
  const { darkMode, mounted } = useTheme()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const checkPasswordStrength = (password) => {
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    let score = 0
    if (hasMinLength) score += 1
    if (hasUppercase) score += 1
    if (hasLowercase) score += 1
    if (hasNumber) score += 1
    if (hasSpecialChar) score += 1

    return {
      score,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordStrength(checkPasswordStrength(newPassword))

    if (currentError === "password") {
      clearCurrentError()
    }
  }

  const handlePasswordFocus = () => {
    setPasswordFocused(true)
  }

  const handlePasswordBlur = () => {
    setPasswordFocused(false)
  }

  // Función para guardar el nombre en localStorage
  const saveNameToStorage = (name) => {
    if (!name.trim()) return

    try {
      const savedNames = JSON.parse(localStorage.getItem("vandentials_names") || "[]")
      const updatedNames = [name, ...savedNames.filter((n) => n !== name)].slice(0, 10)
      localStorage.setItem("vandentials_names", JSON.stringify(updatedNames))
    } catch (error) {
      console.error("Error guardando nombre:", error)
    }
  }

  // Función para guardar el email en localStorage
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

  const handleNombreChange = (e) => {
    const newNombre = e.target.value
    setNombre(newNombre)

    if (currentError === "nombre") {
      clearCurrentError()
    }
  }

  const handleNombreBlur = () => {
    if (nombre.trim()) {
      saveNameToStorage(nombre)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setCurrentError("nombre")
      return
    }

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

    if (passwordStrength.score < 3) {
      setCurrentError("password-weak")
      return
    }

    setCurrentError("")

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: nombre, email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/principal")
      } else {
        throw new Error("Error al registrar usuario")
      }
    } catch (error) {
      console.error(error)
      setErrorMsg("Error al registrar usuario. Intenta nuevamente.")
    }
  }

  const handleGoogleSignup = () => {
    // Aquí implementarás la lógica de Google OAuth
    console.log("Registrarse con Google")
  }

  const clearCurrentError = () => {
    setCurrentError("")
  }

  const getErrorMessage = (field) => {
    const messages = {
      nombre: "Por favor ingresa tu nombre",
      "email-empty": "Por favor ingresa tu correo electrónico",
      "email-invalid": "Por favor ingresa un correo electrónico válido",
      password: "Por favor ingresa tu contraseña",
      "password-weak": "La contraseña es demasiado débil",
    }
    return messages[field] || ""
  }

  const getStrengthColor = (score) => {
    if (score <= 1) return "#ef4444" // Rojo
    if (score <= 3) return "#f59e0b" // Amarillo
    return "#22c55e" // Verde
  }

  const getStrengthText = (score) => {
    if (score <= 1) return "Débil"
    if (score <= 3) return "Media"
    return "Fuerte"
  }

  return (
    <div className={`${styles.fullScreenContainer} ${darkMode ? styles.darkMode : ""}`}>
      <button onClick={() => navigate("/")} className={styles.backButton} aria-label="Volver al inicio">
        <ArrowLeft size={28} />
      </button>
      <div className={`${styles.formWrapper} ${darkMode ? styles.darkMode : ""}`}>
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

        {/* Formulario */}
        <div className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}>
          <h2 className={`${styles.formTitle} ${darkMode ? styles.darkMode : ""}`}>Crear Cuenta</h2>

          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} className={styles.form} autoComplete="off" noValidate>
            <div className={styles.inputGroup}>
              {currentError === "nombre" && (
                <div className={`${styles.customNotification} ${darkMode ? styles.darkMode : ""}`}>
                  <span>{getErrorMessage("nombre")}</span>
                  <button type="button" className={styles.closeButton} onClick={clearCurrentError}>
                    ×
                  </button>
                </div>
              )}
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={nombre}
                onChange={handleNombreChange}
                onBlur={handleNombreBlur}
                className={`${styles.input} ${darkMode ? styles.darkMode : ""}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-lpignore="true"
                data-form-type="other"
              />
            </div>

            <div className={styles.inputGroup}>
              {(currentError === "email-empty" || currentError === "email-invalid") && (
                <div className={`${styles.customNotification} ${darkMode ? styles.darkMode : ""}`}>
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
                className={`${styles.input} ${darkMode ? styles.darkMode : ""}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-lpignore="true"
                data-form-type="other"
              />
            </div>

            <div className={styles.inputGroup}>
              {(currentError === "password" || currentError === "password-weak") && (
                <div className={`${styles.customNotification} ${darkMode ? styles.darkMode : ""}`}>
                  <span>{getErrorMessage(currentError)}</span>
                  <button type="button" className={styles.closeButton} onClick={clearCurrentError}>
                    ×
                  </button>
                </div>
              )}
              <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                className={`${styles.input} ${darkMode ? styles.darkMode : ""}`}
                autoComplete="off"
                data-lpignore="true"
              />

              {password.length > 0 && (
                <div className={`${styles.passwordStrength} ${!passwordFocused ? styles.passwordStrengthCompact : ""}`}>
                  <div className={styles.strengthHeader}>
                    <div className={styles.strengthBar}>
                      <div
                        className={styles.strengthFill}
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: getStrengthColor(passwordStrength.score),
                        }}
                      ></div>
                    </div>
                    {passwordFocused && (
                      <span className={styles.strengthText} style={{ color: getStrengthColor(passwordStrength.score) }}>
                        {getStrengthText(passwordStrength.score)}
                      </span>
                    )}
                  </div>

                  <div className={`${styles.passwordChecks} ${!passwordFocused ? styles.passwordChecksCompact : ""}`}>
                    <span className={passwordStrength.hasMinLength ? styles.checkPassed : styles.checkFailed}>
                      <span className={styles.checkIcon}>✓</span>
                      {passwordFocused && <span className={styles.checkText}>Mínimo 8 caracteres</span>}
                    </span>
                    <span className={passwordStrength.hasUppercase ? styles.checkPassed : styles.checkFailed}>
                      <span className={styles.checkIcon}>✓</span>
                      {passwordFocused && <span className={styles.checkText}>Mayúscula</span>}
                    </span>
                    <span className={passwordStrength.hasLowercase ? styles.checkPassed : styles.checkFailed}>
                      <span className={styles.checkIcon}>✓</span>
                      {passwordFocused && <span className={styles.checkText}>Minúscula</span>}
                    </span>
                    <span className={passwordStrength.hasNumber ? styles.checkPassed : styles.checkFailed}>
                      <span className={styles.checkIcon}>✓</span>
                      {passwordFocused && <span className={styles.checkText}>Número</span>}
                    </span>
                    <span className={passwordStrength.hasSpecialChar ? styles.checkPassed : styles.checkFailed}>
                      <span className={styles.checkIcon}>✓</span>
                      {passwordFocused && <span className={styles.checkText}>Carácter especial</span>}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className={`${styles.submitButton} ${darkMode ? styles.darkMode : ""}`}>
              Registrarse
            </button>

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerText}>o</span>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className={`${styles.googleButton} ${darkMode ? styles.darkMode : ""}`}
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
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
            <p className={`${styles.loginText} ${darkMode ? styles.darkMode : ""}`}>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className={`${styles.loginLink} ${darkMode ? styles.darkMode : ""}`}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
