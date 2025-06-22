"use client"

import Modal from "./Modal"
import styles from "./ConfirmationModal.module.css"

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de que quieres continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "default", // default, danger, warning
}) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getTypeClass = () => {
    switch (type) {
      case "danger":
        return styles.danger
      case "warning":
        return styles.warning
      default:
        return styles.default
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.confirmationModal}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose} type="button">
            {cancelText}
          </button>
          <button className={`${styles.confirmButton} ${getTypeClass()}`} onClick={handleConfirm} type="button">
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
