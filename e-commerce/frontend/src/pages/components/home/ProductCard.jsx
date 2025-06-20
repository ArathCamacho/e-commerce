"use client"

import { useNavigate } from "react-router-dom"
import { Heart } from "./Icons"
import styles from "./ProductCard.module.css"

export default function ProductCard({ image, name, price, productId = "camisa-verano" }) {
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(`/producto/${productId}`)
  }

  return (
    <div className={styles.productCard} onClick={handleProductClick}>
      <div className={styles.productImageContainer}>
        <img src={image || "/placeholder.svg?height=400&width=300"} alt={name} className={styles.productImage} />
        <div className={styles.productImageOverlay}></div>
        <button aria-label="Add to wishlist" className={styles.wishlistButton} onClick={(e) => e.stopPropagation()}>
          <Heart size={16} className={styles.wishlistIcon} />
        </button>
      </div>
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{price}</p>
    </div>
  )
}
