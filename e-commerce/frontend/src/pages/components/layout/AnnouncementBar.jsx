"use client"

import { useState, useEffect } from "react"
import styles from "./AnnouncementBar.module.css"

export default function AnnouncementBar() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calcular opacidad del announcement bar basado en scroll
  const getAnnouncementOpacity = () => {
    const startFade = 50 // Empezar a desvanecer después de 50px
    const disappearPoint = 150 // Desaparecer completamente en 150px

    if (scrollY <= startFade) {
      return 1
    }

    if (scrollY >= disappearPoint) {
      return 0
    }

    const fadeRange = disappearPoint - startFade
    const fadeProgress = (scrollY - startFade) / fadeRange
    return 1 - fadeProgress
  }

  const opacity = getAnnouncementOpacity()

  // Si la opacidad es 0, no renderizar para mejorar performance
  if (opacity === 0) {
    return null
  }

  return (
    <div
      className={styles.announcementBar}
      style={{
        opacity: opacity,
      }}
    >
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
