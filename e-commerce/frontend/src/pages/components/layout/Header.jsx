import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/themeContext"
import { Heart, Search, ShoppingBag, Sun, Moon } from "../home/Icons"
import UserDropdown from "./UserDropDown"
import styles from "./Header.module.css"

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("none")
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const getHeaderOpacity = () => {
    const maxScroll = 150
    const minOpacity = 0.85
    const maxOpacity = 1

    if (scrollDirection === "down" && scrollY > 50) {
      const opacity = Math.max(minOpacity, maxOpacity - (scrollY / maxScroll) * 0.15)
      return opacity
    } else if (scrollDirection === "up" || scrollY <= 50) {
      const opacity = Math.min(maxOpacity, minOpacity + ((maxScroll - scrollY) / maxScroll) * 0.15)
      return opacity
    }

    return maxOpacity
  }

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: darkMode
          ? `rgba(23, 23, 23, ${getHeaderOpacity()})`
          : `rgba(255, 255, 255, ${getHeaderOpacity()})`,
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
            { icon: Heart, label: "Wishlist" },
            { icon: Search, label: "Search" },
            { icon: ShoppingBag, label: "Cart", onClick: () => navigate("/carrito") },
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
