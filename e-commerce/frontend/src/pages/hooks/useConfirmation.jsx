"use client"

import { useState } from "react"

export function useConfirmation() {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    type: "default",
    onConfirm: () => {},
  })

  const showConfirmation = ({
    title = "Confirmar acción",
    message = "¿Estás seguro de que quieres continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "default",
    onConfirm = () => {},
  }) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      type,
      onConfirm,
    })
  }

  const hideConfirmation = () => {
    setConfirmationState((prev) => ({
      ...prev,
      isOpen: false,
    }))
  }

  const handleConfirm = () => {
    confirmationState.onConfirm()
    hideConfirmation()
  }

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  }
}
