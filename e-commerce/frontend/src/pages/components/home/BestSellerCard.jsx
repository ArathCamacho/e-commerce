import { Heart } from "./Icons"
import styles from "./BestSellerCard.module.css"

export default function BestSellerCard({ image, name, price, originalPrice }) {
  return (
    <div className={styles.bestSellerCard}>
      <div className={styles.bestSellerImageContainer}>
        <div className={styles.bestSellerBadge}>MÁS VENDIDO</div>
        <img src={image || "/placeholder.svg?height=400&width=300"} alt={name} className={styles.bestSellerImage} />
        <button aria-label="Add to wishlist" className={styles.wishlistButton}>
          <Heart size={16} className={styles.wishlistIcon} />
        </button>
      </div>
      <h3 className={styles.bestSellerName}>{name}</h3>
      <div className={styles.bestSellerPrices}>
        <p className={styles.bestSellerPrice}>{price}</p>
        <p className={styles.bestSellerOriginalPrice}>{originalPrice}</p>
      </div>
    </div>
  )
}
