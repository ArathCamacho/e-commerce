"use client"

import { Heart } from "../home/Icons"
import styles from "./CartItem.module.css"

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleRemove = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) {
      onRemove(item.id)
    }
  }

  return (
    <div className={styles.cartItem}>
      {/* Product Image con corazón en esquina superior izquierda */}
      <div className={styles.productImage}>
        <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.imageElement} />
        <Heart size={12} className={styles.heartIcon} />
      </div>

      {/* Product Details */}
      <div className={styles.productDetails}>
        <div className={styles.productHeader}>
          <h3 className={styles.productName}>{item.name}</h3>
          <button onClick={handleRemove} className={styles.removeButton} title="Eliminar producto">
            ×
          </button>
        </div>
        <p className={styles.productPrice}>${item.price.toFixed(2)}</p>

        <div className={styles.productInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Id de art.</span>
            <span className={styles.infoValue}>{item.sku}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Color</span>
            <span className={styles.infoValue}>{item.color}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Talla</span>
            <span className={styles.infoValue}>{item.size}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Cantidad</span>
            <span className={styles.infoValue}>{item.quantity}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Total</span>
            <span className={styles.infoValue}>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          {item.stock && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Stock</span>
              <span className={styles.infoValue}>{item.stock} disponibles</span>
            </div>
          )}
        </div>

        {/* Quantity Controls */}
        <div className={styles.quantityControls}>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className={styles.quantityButton}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className={styles.quantityDisplay}>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className={styles.quantityButton}
            disabled={item.quantity >= item.stock}
            title={item.quantity >= item.stock ? "Stock máximo alcanzado" : "Aumentar cantidad"}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
