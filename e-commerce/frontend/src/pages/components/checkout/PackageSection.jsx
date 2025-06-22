"use client"

import styles from "./PackageSection.module.css"

export default function PackageSection({ cartItems }) {
  return (
    <div className={styles.packageSection}>
      <h3 className={styles.packageTitle}>PAQUETE</h3>
      <p className={styles.packageSubtitle}>Enviado por Vandentials</p>

      <div className={styles.packageItems}>
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.variante_id}`} className={styles.packageItem}>
            <div className={styles.itemImage}>
              <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.imageElement} />
            </div>
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemVariant}>
                {item.color} • {item.size} • Cantidad: {item.quantity}
              </p>
              <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
