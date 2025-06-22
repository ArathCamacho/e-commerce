"use client"

import { useEffect } from "react"
import styles from "./Modal.module.css"

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  closeOnOverlayClick = true,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${className}`}>
        {showCloseButton && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
