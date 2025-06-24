"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/themeContext"
import { useAuth } from "../../context/AuthContext"
import { User } from "../home/Icons"
import styles from "./userDropDown.module.css"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogin = () => {
    setIsOpen(false)
    navigate("/login")
  }

  const handleRegister = () => {
    setIsOpen(false)
    navigate("/register")
  }

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    navigate("/") // Redirigir al home después del logout
  }

  const handleProfile = () => {
    setIsOpen(false)
    // Aquí puedes agregar navegación a perfil cuando lo implementes
    console.log("Ir a perfil")
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-label="Account"
        className={`${styles.dropdownButton} ${darkMode ? styles.dark : ""}`}
        style={{ outline: "none" }}
      >
        <User size={20} />
      </button>

      {isOpen && (
        <div className={`${styles.dropdownMenu} ${darkMode ? styles.dark : ""}`}>
          <div className={styles.dropdownHeader}>
            <h3 className={styles.dropdownTitle}>{isAuthenticated() ? `Hola, ${user?.username}` : "Mi Cuenta"}</h3>
          </div>
          <div className={styles.dropdownContent}>
            {isAuthenticated() ? (
              // Usuario autenticado - mostrar opciones de usuario logueado
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleProfile()
                  }}
                  className={`${styles.dropdownItem} ${darkMode ? styles.dark : ""}`}
                  style={{ outline: "none" }}
                >
                  <span className={styles.dropdownItemText}>Mi Perfil</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate("/checkout")
                    setIsOpen(false)
                  }}
                  className={`${styles.dropdownItem} ${darkMode ? styles.dark : ""}`}
                  style={{ outline: "none" }}
                >
                  <span className={styles.dropdownItemText}>Mis Pedidos</span>
                </button>
                <div className={styles.dropdownDivider}></div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleLogout()
                  }}
                  className={`${styles.dropdownItem} ${styles.logoutItem} ${darkMode ? styles.dark : ""}`}
                  style={{ outline: "none" }}
                >
                  <span className={styles.dropdownItemText}>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              // Usuario no autenticado - mostrar opciones de login/registro
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleLogin()
                  }}
                  className={`${styles.dropdownItem} ${darkMode ? styles.dark : ""}`}
                  style={{ outline: "none" }}
                >
                  <span className={styles.dropdownItemText}>Iniciar Sesión</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRegister()
                  }}
                  className={`${styles.dropdownItem} ${darkMode ? styles.dark : ""}`}
                  style={{ outline: "none" }}
                >
                  <span className={styles.dropdownItemText}>Crear Cuenta</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
