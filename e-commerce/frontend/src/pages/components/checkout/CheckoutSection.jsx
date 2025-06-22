"use client"

import styles from "./CheckoutSection.module.css"

export default function CheckoutSection({ title, children, onEdit, isEmpty = false }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <button className={styles.editButton} onClick={onEdit}>
          EDITAR
        </button>
      </div>
      <div className={`${styles.sectionContent} ${isEmpty ? styles.empty : ""}`}>{children}</div>
    </div>
  )
}
