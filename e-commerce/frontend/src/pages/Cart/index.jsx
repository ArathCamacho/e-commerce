"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import CartItem from "../components/cart/CartItem"
import OrderSummary from "../components/cart/OrderSummary"
import sharedStyles from "../styles/CartGeneral.module.css"

export default function CarritoPage() {
  const { darkMode, mounted } = useTheme()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Obtener session ID
  const getSessionId = () => {
    return localStorage.getItem("cart_session_id") || ""
  }

  // Cargar items del carrito
  const loadCartItems = async () => {
    const sessionId = getSessionId()
    if (!sessionId) {
      setCartItems([])
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/carrito/${sessionId}`)
      if (response.ok) {
        const items = await response.json()
        setCartItems(items)
      } else {
        console.error("Error al cargar carrito")
        setError("Error al cargar el carrito")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  // Actualizar cantidad
  const updateQuantity = async (carritoId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      const response = await fetch("http://localhost:3001/api/carrito/cantidad", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrito_id: carritoId,
          nueva_cantidad: newQuantity,
          sesion_id: getSessionId(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Actualizar el estado local
        setCartItems((items) =>
          items.map((item) => (item.id === carritoId ? { ...item, quantity: newQuantity } : item)),
        )
      } else {
        alert(`Error: ${result.error}`)
        if (result.stockDisponible) {
          alert(`Stock disponible: ${result.stockDisponible}`)
        }
      }
    } catch (error) {
      console.error("Error al actualizar cantidad:", error)
      alert("Error al actualizar la cantidad")
    }
  }

  // Eliminar item del carrito
  const removeItem = async (carritoId) => {
    try {
      const response = await fetch("http://localhost:3001/api/carrito", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrito_id: carritoId,
          sesion_id: getSessionId(),
        }),
      })

      if (response.ok) {
        setCartItems((items) => items.filter((item) => item.id !== carritoId))
      } else {
        alert("Error al eliminar el producto")
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("Error al eliminar el producto")
    }
  }

  useEffect(() => {
    loadCartItems()

    // Escuchar eventos de actualización del carrito
    const handleCartUpdate = () => {
      loadCartItems()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 140.0
  const total = subtotal + shipping

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className={`${sharedStyles.container} ${darkMode ? sharedStyles.dark : ""}`}>
        <Header />
        <main className={sharedStyles.mainContent}>
          <div className={sharedStyles.sectionContainer}>
            <p>Cargando carrito...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={`${sharedStyles.container} ${darkMode ? sharedStyles.dark : ""}`}>
      <Header />

      <main className={sharedStyles.mainContent}>
        <div className={sharedStyles.sectionContainer}>
          <h1 className={sharedStyles.pageTitle}>BOLSA DE COMPRAS</h1>

          {error && <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>}

          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h2>Tu carrito está vacío</h2>
              <p>Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className={sharedStyles.cartLayout}>
              {/* Cart Items */}
              <div className={sharedStyles.cartItems}>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                ))}
              </div>

              {/* Order Summary */}
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
