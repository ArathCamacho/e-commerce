"use client"

import { useState, useEffect } from "react"
import styles from "./ProductInfo.module.css"

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

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setShowSizeError(true)
      return
    }

    if (selectedVariantStock === 0) {
      alert("Este producto no tiene stock disponible")
      return
    }

    setIsAddingToCart(true)

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

      console.log("Enviando al carrito:", cartData)

      const response = await fetch("http://localhost:3001/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      })

      const result = await response.json()

      if (response.ok) {
        alert(`¡Producto agregado al carrito!\n\n${name}\nColor: ${colorSeleccionado.name}\nTalla: ${selectedSize}`)

        // Emitir evento para actualizar contador del carrito
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      } else {
        alert(`Error: ${result.error}`)
        if (result.stockDisponible !== undefined) {
          console.log("Stock disponible:", result.stockDisponible)
        }
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      alert("Error al agregar el producto al carrito. Inténtalo de nuevo.")
    } finally {
      setIsAddingToCart(false)
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
          <h3 className={styles.sectionTitle}>
            {selectedSize ? `Talla seleccionada: ${selectedSize}` : "SELECCIONE LA TALLA"}
          </h3>
          {showSizeError && (
            <div className={styles.sizeError}>
              <span className={styles.errorIcon}>⚠</span>
              <span>Selecciona una talla</span>
            </div>
          )}
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
        disabled={!selectedSize || selectedVariantStock === 0 || isAddingToCart}
      >
        {isAddingToCart ? "AGREGANDO..." : selectedVariantStock === 0 && selectedSize ? "SIN STOCK" : "AGREGAR"}
      </button>
    </div>
  )
}
