"use client"

import { useState } from "react"

export function useNotification() {
  const [notifications, setNotifications] = useState([])

  const showNotification = ({ message, type = "info", duration = 4000 }) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type,
      duration,
      isVisible: true,
    }

    setNotifications((prev) => [...prev, notification])

    return id
  }

  const hideNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const showSuccess = (message, duration) => showNotification({ message, type: "success", duration })
  const showError = (message, duration) => showNotification({ message, type: "error", duration })
  const showWarning = (message, duration) => showNotification({ message, type: "warning", duration })
  const showInfo = (message, duration) => showNotification({ message, type: "info", duration })

  return {
    notifications,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
