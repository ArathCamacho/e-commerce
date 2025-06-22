"use client"

import { useEffect, useState } from "react"
import styles from "./NotificationToast.module.css"

export default function NotificationToast({
  message,
  type = "info", // info, success, warning, error
  duration = 4000,
  onClose,
  isVisible,
}) {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true)
      const timer = setTimeout(() => {
        setIsShowing(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getTypeClass = () => {
    switch (type) {
      case "success":
        return styles.success
      case "warning":
        return styles.warning
      case "error":
        return styles.error
      default:
        return styles.info
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓"
      case "warning":
        return "⚠"
      case "error":
        return "✕"
      default:
        return "ℹ"
    }
  }

  if (!isVisible) return null

  return (
    <div className={`${styles.toast} ${getTypeClass()} ${isShowing ? styles.show : styles.hide}`}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.message}>{message}</div>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsShowing(false)
          setTimeout(onClose, 300)
        }}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  )
}
