import WishlistProductCard from "./WishlistProductCard"
import styles from "./WishlistProductGrid.module.css"

export default function WishlistProductGrid({ items, onRemoveItem, onAddToCart, onGoToProduct }) {
  return (
    <div className={styles.productsGrid}>
      {items.map((item) => (
        <WishlistProductCard
          key={item.id}
          item={item}
          onRemove={onRemoveItem}
          onAddToCart={onAddToCart}
          onGoToProduct={onGoToProduct}
        />
      ))}
    </div>
  )
}
