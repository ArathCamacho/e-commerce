import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/themeContext"
import { User } from "../home/Icons"
import styles from "./userDropDown.module.css"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode } = useTheme()
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
            <h3 className={styles.dropdownTitle}>Mi Cuenta</h3>
          </div>
          <div className={styles.dropdownContent}>
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
          </div>
        </div>
      )}
    </div>
  )
}
