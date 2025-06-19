import { useState } from "react"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import CartItem from "../components/cart/CartItem"
import OrderSummary from "../components/cart/OrderSummary"
import sharedStyles from "../styles/CartGeneral.module.css"

export default function CarritoPage() {
  const { darkMode, mounted } = useTheme()

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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 140.0
  const total = subtotal + shipping

  if (!mounted) {
    return null
  }

  return (
    <div className={`${sharedStyles.container} ${darkMode ? sharedStyles.dark : ""}`}>
      <Header />

      <main className={sharedStyles.mainContent}>
        <div className={sharedStyles.sectionContainer}>
          <h1 className={sharedStyles.pageTitle}>BOLSA DE COMPRAS</h1>

          <div className={sharedStyles.cartLayout}>
            {/* Cart Items */}
            <div className={sharedStyles.cartItems}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} />
              ))}
            </div>

            {/* Order Summary */}
            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </div>
      </main>
    </div>
  )
}
