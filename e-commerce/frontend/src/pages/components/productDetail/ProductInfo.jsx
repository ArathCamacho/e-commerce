"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./ProductInfo.module.css"

export default function ProductInfo({ name, price, colors, sizes }) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla")
      return
    }
    // Aquí iría la lógica para agregar al carrito
    console.log("Agregando al carrito:", {
      name,
      price,
      color: colors[selectedColor],
      size: selectedSize,
    })
  }

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productName}>{name}</h1>
      <p className={styles.productPrice}>${price.toFixed(2)}</p>

      {/* Color Selection */}
      <div className={styles.colorSection}>
        <h3 className={styles.sectionTitle}>Color: {colors[selectedColor].name}</h3>
        <div className={styles.colorOptions}>
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`${styles.colorOption} ${index === selectedColor ? styles.colorOptionSelected : ""}`}
            >
              <img src={color.image || "/placeholder.svg"} alt={color.name} />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className={styles.sizeSection}>
        <h3 className={styles.sectionTitle}>SELECCIONE LA TALLA</h3>
        <div className={styles.sizeOptions}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`${styles.sizeOption} ${selectedSize === size ? styles.sizeOptionSelected : ""}`}
            >
              {size}
            </button>
          ))}
        </div>
        <button className={styles.sizeGuideButton}>GUÍA DE TALLAS</button>
      </div>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        AGREGAR
      </button>
    </div>
  )
}
