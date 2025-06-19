import styles from "./AnnouncementBar.module.css"

export default function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <div className={styles.announcementScroll}>
        <span className={styles.announcementItem}>🎉 OFERTAS ESPECIALES - HASTA 50% DE DESCUENTO</span>
        <span className={styles.announcementItem}>✨ ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN</span>
        <span className={styles.announcementItem}>🔥 NUEVA COLECCIÓN PRIMAVERA-VERANO 2024</span>
        <span className={styles.announcementItem}>💎 MIEMBROS VIP - 20% DESCUENTO ADICIONAL</span>
        <span className={styles.announcementItem}>🚚 ENTREGA EXPRESS EN HERMOSILLO</span>
        <span className={styles.announcementItem}>🎉 OFERTAS ESPECIALES - HASTA 50% DE DESCUENTO</span>
        <span className={styles.announcementItem}>✨ ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN</span>
        <span className={styles.announcementItem}>🔥 NUEVA COLECCIÓN PRIMAVERA-VERANO 2024</span>
        <span className={styles.announcementItem}>💎 MIEMBROS VIP - 20% DESCUENTO ADICIONAL</span>
        <span className={styles.announcementItem}>🚚 ENTREGA EXPRESS EN HERMOSILLO</span>
      </div>
    </div>
  )
}
