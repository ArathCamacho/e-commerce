import { useNavigate } from "react-router-dom"
import PaymentMethods from "./PaymentMethods"
import styles from "./OrderSummary.module.css"

export default function OrderSummary({ subtotal, shipping, total }) {
  const navigate = useNavigate()

  return (
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

        <PaymentMethods />
      </div>
    </div>
  )
}
