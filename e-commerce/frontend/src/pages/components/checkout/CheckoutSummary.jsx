"use client"

import { useNavigate } from "react-router-dom"
import PaymentMethods from "../cart/PaymentMethods"
import styles from "./CheckoutSummary.module.css"

export default function CheckoutSummary({ subtotal, shipping, total, cartItems }) {
  const navigate = useNavigate()

  const handleContinuePurchase = () => {
    // Aquí iría la lógica para procesar el pago
    console.log("Procesando compra...")
    // Por ahora solo mostramos un mensaje
    alert("Funcionalidad de pago en desarrollo")
  }

  const handleAddDiscount = () => {
    // Función para agregar descuentos
    console.log("Agregar descuento")
  }

  return (
    <div className={styles.checkoutSummary}>
      <div className={styles.summaryContent}>
        <div className={styles.discountsSection}>
          <div className={styles.discountsHeader}>
            <h3 className={styles.discountsTitle}>DESCUENTOS</h3>
            <button className={styles.addButton} onClick={handleAddDiscount}>
              AGREGAR
            </button>
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

        <button className={styles.checkoutButton} onClick={handleContinuePurchase}>
          CONTINUAR CON LA COMPRA
        </button>

        <PaymentMethods />
      </div>
    </div>
  )
}
