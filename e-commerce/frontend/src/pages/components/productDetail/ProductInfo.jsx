"use client"

import { useState, useEffect } from "react"
import styles from "./ProductInfo.module.css"
import NotificationToast from "../ui/NotificationToast"

const ExclamationIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export default function ProductInfo({
  name,
  description,
  price,
  colors,
  sizes,
  variantes,
  selectedColorIndex,
  onColorChange,
}) {
  const [selectedSize, setSelectedSize] = useState("")
  const [availableSizes, setAvailableSizes] = useState([])
  const [selectedVariantStock, setSelectedVariantStock] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showSizeError, setShowSizeError] = useState(false)
  const [notifications, setNotifications] = useState([])

  const showSuccess = (message) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type: "success", isVisible: true }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 4000)
  }

  const showError = (message) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type: "error", isVisible: true }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 4000)
  }

  // Generar o obtener session ID
  const getSessionId = () => {
    let sessionId = localStorage.getItem("cart_session_id")
    if (!sessionId) {
      sessionId = "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
      localStorage.setItem("cart_session_id", sessionId)
    }
    return sessionId
  }

  // Actualizar tallas disponibles cuando cambia el color seleccionado
  useEffect(() => {
    if (variantes && variantes[selectedColorIndex]) {
      const tallasDelColor = variantes[selectedColorIndex].tallas

      const tallasActualizadas = sizes.map((size) => {
        const tallaEnColor = tallasDelColor.find((t) => t.talla === size.value)
        return {
          ...size,
          available: tallaEnColor ? tallaEnColor.disponible : false,
          stock: tallaEnColor ? tallaEnColor.stock : 0,
        }
      })

      setAvailableSizes(tallasActualizadas)

      // Si la talla seleccionada no está disponible en el nuevo color, la deseleccionamos
      const tallaSeleccionadaDisponible = tallasDelColor.find((t) => t.talla === selectedSize && t.disponible)

      if (!tallaSeleccionadaDisponible) {
        setSelectedSize("")
        setSelectedVariantStock(0)
      } else {
        setSelectedVariantStock(tallaSeleccionadaDisponible.stock)
      }
    }
  }, [selectedColorIndex, variantes, sizes, selectedSize])

  // Actualizar stock cuando cambia la talla seleccionada
  useEffect(() => {
    if (selectedSize && variantes && variantes[selectedColorIndex]) {
      const tallaInfo = variantes[selectedColorIndex].tallas.find((t) => t.talla === selectedSize)
      setSelectedVariantStock(tallaInfo ? tallaInfo.stock : 0)
    }
  }, [selectedSize, selectedColorIndex, variantes])

  const handleColorChange = (colorIndex) => {
    onColorChange(colorIndex)
  }

  const handleSizeChange = (sizeValue) => {
    setSelectedSize(sizeValue)
    setShowSizeError(false) // Ocultar error cuando se selecciona una talla
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("handleAddToCart called") // Debug
    console.log("selectedSize:", selectedSize) // Debug
    console.log("showSizeError before:", showSizeError) // Debug

    // Verificar si no hay talla seleccionada
    if (!selectedSize || selectedSize.trim() === "") {
      console.log("No size selected, showing error") // Debug
      setShowSizeError(true) // Activar el estado de error visual

      // Forzar re-render
      setTimeout(() => {
        console.log("showSizeError after timeout:", showSizeError) // Debug
      }, 100)

      showError("Por favor selecciona una talla antes de agregar el producto al carrito")
      return
    }

    if (selectedVariantStock === 0) {
      console.log("No stock available") // Debug
      showError("Sin stock disponible para esta talla")
      return
    }

    setIsAddingToCart(true)
    console.log("Starting to add to cart") // Debug

    try {
      const colorSeleccionado = colors[selectedColorIndex]
      const sessionId = getSessionId()

      // Obtener el producto_id del primer variante (todos tienen el mismo producto_id)
      const producto_id = variantes[0]?.producto_id || 1

      const cartData = {
        producto_id: producto_id,
        color: colorSeleccionado.name,
        talla: selectedSize,
        cantidad: 1,
        sesion_id: sessionId,
      }

      console.log("Enviando al carrito:", cartData) // Debug

      const response = await fetch("http://localhost:3001/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      })

      const result = await response.json()
      console.log("Response from server:", result) // Debug

      if (response.ok) {
        console.log("Success! Showing toast") // Debug
        showSuccess("¡Producto agregado al carrito exitosamente!")

        // Emitir evento para actualizar contador del carrito
        window.dispatchEvent(new CustomEvent("cartUpdated"))
        console.log("Cart updated event dispatched") // Debug
      } else {
        console.log("Error response:", result) // Debug
        showError(result.error || "No se pudo agregar el producto al carrito")
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      showError("Error de conexión. No se pudo conectar con el servidor.")
    } finally {
      setIsAddingToCart(false)
      console.log("Add to cart process finished") // Debug
    }
  }

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productName}>{name}</h1>
      {description && <p className={styles.productDescription}>{description}</p>}
      <p className={styles.productPrice}>${price.toFixed(2)}</p>

      <div className={styles.colorSection}>
        <h3 className={styles.sectionTitle}>Color: {colors[selectedColorIndex]?.name}</h3>
        <div className={styles.colorOptions}>
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(index)}
              className={`${styles.colorOption} ${index === selectedColorIndex ? styles.colorOptionSelected : ""}`}
              title={`Seleccionar color ${color.name}`}
            >
              <img src={color.image || "/placeholder-image.png"} alt={color.name} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sizeSection}>
        <div className={styles.sizeHeader}>
          <h3 className={`${styles.sectionTitle} ${showSizeError ? styles.sectionTitleError : ""}`}>
            {showSizeError && <ExclamationIcon size={16} className={styles.errorIcon} />}
            {selectedSize ? `Talla seleccionada: ${selectedSize}` : "SELECCIONE LA TALLA"}
          </h3>
        </div>

        <div className={styles.sizeOptions}>
          {availableSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => size.available && handleSizeChange(size.value)}
              className={`${styles.sizeOption} ${
                selectedSize === size.value ? styles.sizeOptionSelected : ""
              } ${!size.available ? styles.sizeOptionUnavailable : ""}`}
              disabled={!size.available}
              title={
                size.available ? `Talla ${size.value} - Stock: ${size.stock}` : `Talla ${size.value} - No disponible`
              }
            >
              {size.value}
              {!size.available && <span className={styles.unavailableLine}></span>}
            </button>
          ))}
        </div>

        {selectedSize && selectedVariantStock > 0 && (
          <p className={styles.stockInfo}>Stock disponible: {selectedVariantStock} unidades</p>
        )}

        <button className={styles.sizeGuideButton}>GUÍA DE TALLAS</button>
      </div>

      <button
        onClick={handleAddToCart}
        className={styles.addToCartButton}
        disabled={(selectedVariantStock === 0 && selectedSize) || isAddingToCart}
      >
        {isAddingToCart ? "AGREGANDO..." : selectedVariantStock === 0 && selectedSize ? "SIN STOCK" : "AGREGAR"}
      </button>

      {/* Notificaciones */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  )
}
