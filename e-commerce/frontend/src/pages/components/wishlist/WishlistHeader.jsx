import styles from "./WishlistHeader.module.css"

export default function WishlistHeader({ itemCount }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>Lista de Deseos</h1>
      <p className={styles.itemCount}>
        {itemCount} producto{itemCount !== 1 ? "s" : ""}
      </p>
    </div>
  )
}
