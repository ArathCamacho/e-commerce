"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "./context/themeContext"
import styles from "./styles/Carrito.module.css"
import { Heart, Search, ShoppingBag, Sun, Moon } from "lucide-react"
import UserDropdown from "./components/userDropDown"

export default function Carrito() {
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useTheme()

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "PLAYERA POLO",
      price: 140.0,
      color: "Blanco",
      size: "G",
      quantity: 1,
      image: "/images/ImagenPrueba.jpeg",
      sku: "008",
    },
    {
      id: 2,
      name: "PLAYERA POLO",
      price: 140.0,
      color: "Camel",
      size: "G",
      quantity: 1,
      image: "/images/ImagenPrueba.jpeg",
      sku: "008",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const getHeaderOpacity = () => {
    return 0.95
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 140.0
  const total = subtotal + shipping

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Header */}
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
                    { icon: ShoppingBag, label: "Cart" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} aria-label={label} className={styles.headerButton} style={{ outline: "none" }}onClick={label === "Cart" ? () => navigate("/carrito") : undefined}>
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

      {/* Shopping Cart Content */}
      <main className={styles.mainContent}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.pageTitle}>BOLSA DE COMPRAS</h1>

          <div className={styles.cartLayout}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  {/* Product Image */}
                  <div className={styles.productImage}>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.imageElement} />
                  </div>

                  {/* Product Details */}
                  <div className={styles.productDetails}>
                    <div className={styles.productHeader}>
                      <Heart size={16} className={styles.heartIcon} />
                      <h3 className={styles.productName}>{item.name}</h3>
                    </div>
                    <p className={styles.productPrice}>${item.price.toFixed(2)}</p>

                    <div className={styles.productInfo}>
                      <div className={styles.infoRow}>
                        Id de art. <strong>{item.sku}</strong>
                      </div>
                      <div className={styles.infoRow}>
                        Color: <strong>{item.color}</strong>
                      </div>
                      <div className={styles.infoRow}>
                        Talla: <strong>{item.size}</strong>
                      </div>
                      <div className={styles.infoRow}>
                        Cantidad: <strong>{item.quantity}</strong>
                      </div>
                      <div className={styles.infoRow}>
                        Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.quantityButton}
                      >
                        −
                      </button>
                      <span className={styles.quantityDisplay}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <div className={styles.summaryContent}>
                <div className={styles.discountsSection}>
                  <div className={styles.discountsHeader}>
                    <h3 className={styles.discountsTitle}>DESCUENTOS</h3>
                    <button className={styles.addButton}>AGREGAR</button>
                  </div>

                  <div className={styles.orderDetails}>
                    <div className={styles.orderRow}>
                      <span>Valor del pedido</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.orderRow}>
                      <span>Costo estimado de envío</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className={styles.totalSection}>
                    <div className={styles.totalRow}>
                      <span>TOTAL</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className={styles.checkoutButton} onClick={() => navigate("/checkout")}>
                  CONTINUAR CON LA COMPRA
                </button>

                <button className={styles.loginButton} onClick={() => navigate("/login")}>
                  INICIAR SESIÓN
                </button>

                {/* Payment Methods */}
                <div className={styles.paymentMethods}>
                  <div className={`${styles.paymentCard} ${styles.visa}`}>VISA</div>
                  <div className={`${styles.paymentCard} ${styles.mastercard}`}>MC</div>
                  <div className={`${styles.paymentCard} ${styles.amex}`}>AMEX</div>
                  <div className={`${styles.paymentCard} ${styles.paypal}`}>PP</div>
                  <div className={`${styles.paymentCard} ${styles.oxxo}`}>OXXO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
