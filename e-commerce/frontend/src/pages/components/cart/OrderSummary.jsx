"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import PaymentMethods from "./PaymentMethods"
import styles from "./OrderSummary.module.css"

export default function OrderSummary({ subtotal, shipping, total, freeShippingThreshold = 800 }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleContinueCheckout = () => {
    if (isAuthenticated()) {
      // Usuario autenticado, ir directamente al checkout
      navigate("/checkout")
    } else {
      // Usuario no autenticado, ir al login con parámetro de redirección
      navigate("/login?redirect=checkout")
    }
  }

  const handleLogin = () => {
    navigate("/login?redirect=checkout")
  }

  // Calcular cuánto falta para envío gratis
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const hasEarnedFreeShipping = subtotal >= freeShippingThreshold

  return (
    <div className={styles.orderSummary}>
      <div className={styles.summaryContent}>
        <div className={styles.discountsSection}>
          <div className={styles.discountsHeader}>
            <h3 className={styles.discountsTitle}>DESCUENTOS</h3>
            <button className={styles.addButton}>AGREGAR</button>
          </div>

          {/* Mensaje de envío gratis */}
          {!hasEarnedFreeShipping && amountForFreeShipping > 0 && (
            <div className={styles.freeShippingMessage}>
              <p className={styles.freeShippingText}>
                ¡Agrega <strong>${amountForFreeShipping.toFixed(2)}</strong> más para obtener{" "}
                <strong>envío gratis</strong>!
              </p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {hasEarnedFreeShipping && (
            <div className={styles.freeShippingEarned}>
              <p className={styles.freeShippingEarnedText}>
                <strong>Envío sin costo incluido</strong>
              </p>
              <p className={styles.freeShippingSubtext}>Tu pedido califica para envío gratuito</p>
            </div>
          )}

          <div className={styles.orderDetails}>
            <div className={styles.orderRow}>
              <span>Valor del pedido</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.orderRow}>
              <span>Costo de envío</span>
              <span className={shipping === 0 ? styles.freeShippingPrice : ""}>
                {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button className={styles.checkoutButton} onClick={handleContinueCheckout}>
          CONTINUAR CON LA COMPRA
        </button>

        {/* Solo mostrar botón de login si no está autenticado */}
        {!isAuthenticated() && (
          <button className={styles.loginButton} onClick={handleLogin}>
            INICIAR SESIÓN
          </button>
        )}

        <PaymentMethods />
      </div>
    </div>
  )
}
