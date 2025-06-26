"use client"

import styles from "./WishlistProductCard.module.css"

export default function WishlistProductCard({ item, onRemove, onAddToCart, onGoToProduct }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className={styles.productImage}
          onClick={() => onGoToProduct(item.id)}
        />
        <button className={styles.removeBtn} onClick={() => onRemove(item)} aria-label="Eliminar">
          ×
        </button>
      </div>

      <div className={styles.productDetails}>
        <h3 className={styles.productName} onClick={() => onGoToProduct(item.id)}>
          {item.name}
        </h3>
        <p className={styles.productPrice}>${item.price}</p>
        <p className={styles.productColor}>{item.color}</p>

        <button className={styles.addToCartBtn} onClick={() => onAddToCart(item)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
