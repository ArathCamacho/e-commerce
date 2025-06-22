"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layout/Header"
import CheckoutForm from "../components/checkout/CheckoutForm"
import CheckoutSummary from "../components/checkout/CheckoutSummary"
import styles from "../styles/CheckoutGeneral.module.css"

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

export default function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Obtener session ID
  const getSessionId = () => {
    return localStorage.getItem("cart_session_id") || ""
  }

  // Cargar items del carrito
  const loadCartItems = async () => {
    const sessionId = getSessionId()
    if (!sessionId) {
      navigate("/carrito")
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/carrito/${sessionId}`)
      if (response.ok) {
        const items = await response.json()
        if (items.length === 0) {
          navigate("/carrito")
          return
        }
        setCartItems(items)
      } else {
        navigate("/carrito")
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error)
      navigate("/carrito")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCartItems()
  }, [])

  // Calcular totales con envío gratis después de $800
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const FREE_SHIPPING_THRESHOLD = 800
  const SHIPPING_COST = 140.0
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <button onClick={() => navigate("/carrito")} className={styles.backButton} aria-label="Volver al carrito">
          <ArrowLeft size={24} />
        </button>
        <div className={styles.loadingContainer} style={{ paddingTop: "5rem" }}>
          <div className={styles.loading}>Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={() => navigate("/carrito")} className={styles.backButton} aria-label="Volver al carrito">
        <ArrowLeft size={24} />
      </button>
      <main className={styles.mainContent} style={{ paddingTop: "5rem" }}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.pageTitle}>PROCESO DE COMPRA</h1>

          <div className={styles.checkoutLayout}>
            <CheckoutForm cartItems={cartItems} />
            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              cartItems={cartItems}
              freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
