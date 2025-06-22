"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/themeContext"
import { Heart, Search, ShoppingBag, Sun, Moon } from "../home/Icons"
import UserDropdown from "./UserDropDown"
import styles from "./Header.module.css"

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)
  const navigate = useNavigate()

  // Obtener session ID
  const getSessionId = () => {
    return localStorage.getItem("cart_session_id") || ""
  }

  // Cargar contador del carrito
  const loadCartCount = async () => {
    const sessionId = getSessionId()
    if (!sessionId) {
      setCartItemCount(0)
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/carrito/${sessionId}`)
      if (response.ok) {
        const items = await response.json()
        const totalItems = items.reduce((total, item) => total + item.quantity, 0)
        setCartItemCount(totalItems)
      } else {
        setCartItemCount(0)
      }
    } catch (error) {
      console.error("Error al cargar contador del carrito:", error)
      setCartItemCount(0)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Cargar contador inicial
    loadCartCount()

    // Escuchar eventos de actualización del carrito
    const handleCartUpdate = () => {
      loadCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  // Calcular opacidad del header basado en scroll
  const getHeaderOpacity = () => {
    const startFade = 100 // Empezar a desvanecer después de 100px
    const minOpacity = 0.3 // Opacidad mínima del 30%

    if (scrollY <= startFade) {
      return 1
    }

    const fadeRange = 200 // Rango de desvanecimiento
    const fadeProgress = Math.min((scrollY - startFade) / fadeRange, 1)
    return Math.max(minOpacity, 1 - fadeProgress * 0.7) // Reducir hasta 30%
  }

  return (
    <header
      className={styles.header}
      style={{
        opacity: getHeaderOpacity(),
        backgroundColor: darkMode
          ? `rgba(23, 23, 23, ${getHeaderOpacity() * 0.95})`
          : `rgba(255, 255, 255, ${getHeaderOpacity() * 0.95})`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className={styles.headerContent}>
        <div onClick={() => navigate("/")} className={styles.logo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoCircle}>V</div>
            <span className={styles.logoText}>
              <span className={styles.logoTextGreen}>VAND</span>
              <span className={styles.logoTextBold}>ENTIALS</span>
            </span>
          </div>
        </div>

        <nav className={styles.nav}>
          {["Mujer", "Hombre", "Niños", "Novedades", "Ofertas"].map((item) => (
            <div key={item} onClick={() => navigate(`/${item.toLowerCase()}`)} className={styles.navItem}>
              {item}
              <span className={styles.navUnderline}></span>
            </div>
          ))}
        </nav>

        <div className={styles.headerActions}>
          {[
            { icon: Heart, label: "Wishlist", onClick: () => navigate("/wishlist") },
            { icon: Search, label: "Search", onClick: () => navigate("/search") },
          ].map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              aria-label={label}
              className={styles.headerButton}
              style={{ outline: "none" }}
              onClick={onClick}
            >
              <Icon size={20} />
            </button>
          ))}

          {/* Botón del carrito con contador */}
          <button
            aria-label="Cart"
            className={`${styles.headerButton} ${styles.cartButton}`}
            style={{ outline: "none" }}
            onClick={() => navigate("/carrito")}
          >
            <div className={styles.cartIconContainer}>
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <div className={styles.cartBadge}>
                  <span className={styles.cartBadgeText}>{cartItemCount > 99 ? "99+" : cartItemCount}</span>
                </div>
              )}
            </div>
          </button>

          <UserDropdown />

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={styles.themeToggle}
            style={{ outline: "none" }}
          >
            <div className={styles.themeToggleContent}>
              <Sun
                size={20}
                className={`${styles.themeIcon} ${darkMode ? styles.themeIconHidden : styles.themeIconVisible}`}
              />
              <Moon
                size={20}
                className={`${styles.themeIcon} ${darkMode ? styles.themeIconVisible : styles.themeIconHidden}`}
              />
            </div>
            <div className={styles.themeToggleGradient}></div>
          </button>
        </div>
      </div>
    </header>
  )
}
