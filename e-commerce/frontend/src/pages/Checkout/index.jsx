import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layout/Header"
import CheckoutForm from "../components/checkout/CheckoutForm"
import CheckoutSummary from "../components/checkout/CheckoutSummary"
import styles from "../styles/CheckoutGeneral.module.css"

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

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10.0 // Costo fijo de envío por ahora
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.pageTitle}>PROCESO DE COMPRA</h1>

          <div className={styles.checkoutLayout}>
            <CheckoutForm cartItems={cartItems} />
            <CheckoutSummary subtotal={subtotal} shipping={shipping} total={total} cartItems={cartItems} />
          </div>
        </div>
      </main>
    </div>
  )
}
