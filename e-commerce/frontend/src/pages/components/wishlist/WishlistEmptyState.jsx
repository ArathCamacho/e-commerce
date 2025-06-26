"use client"

import styles from "./WishlistEmptyState.module.css"

export default function WishlistEmptyState({ onExplore }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>♡</div>
      <h2 className={styles.emptyTitle}>Tu lista está vacía</h2>
      <p className={styles.emptyText}>Guarda tus productos favoritos aquí</p>
      <button className={styles.exploreButton} onClick={onExplore}>
        Explorar productos
      </button>
    </div>
  )
}
