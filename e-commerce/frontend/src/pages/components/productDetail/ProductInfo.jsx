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
    // Llamamos a la función del componente padre para actualizar el estado global
    onColorChange(colorIndex)
  }

  const handleSizeChange = (sizeValue) => {
    setSelectedSize(sizeValue)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla")
      return
    }

    const colorSeleccionado = colors[selectedColorIndex]
    const tallaInfo = availableSizes.find((s) => s.value === selectedSize)

    alert(
      `Producto agregado al carrito:\n\n` +
        `${name}\n` +
        `Color: ${colorSeleccionado.name}\n` +
        `Talla: ${selectedSize}\n` +
        `Precio: $${price.toFixed(2)}\n` +
        `Stock disponible: ${tallaInfo.stock}`,
    )

    console.log("Datos para enviar al carrito:", {
      productoId: variantes[0]?.producto_id || 1,
      color: colorSeleccionado.name,
      talla: selectedSize,
      precio: price,
      cantidad: 1,
    })
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
        <h3 className={styles.sectionTitle}>SELECCIONE LA TALLA</h3>
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
        disabled={!selectedSize || selectedVariantStock === 0}
      >
        {selectedVariantStock === 0 && selectedSize ? "SIN STOCK" : "AGREGAR"}
      </button>
    </div>
  )
}
