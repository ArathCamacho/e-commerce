"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./ProductImageGallery.module.css"

export default function ProductImageGallery({ images, productName, colors, selectedColorIndex }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const imageRef = useRef(null)

  // Efecto para resetear el estado de carga cuando cambia la imagen
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [selectedColorIndex])

  const handleImageLoad = (e) => {
    setImageLoaded(true)
    setImageError(false)
    setImageDimensions({ width: e.target.naturalWidth, height: e.target.naturalHeight })
  }

  const handleImageError = (e) => {
    setImageError(true)
    setImageLoaded(false)
  }

  const getImageFit = () => {
    if (!imageLoaded || !imageDimensions.width || !imageDimensions.height) return "cover"
    const aspectRatio = imageDimensions.width / imageDimensions.height
    if (aspectRatio > 2 || aspectRatio < 0.5) return "contain"
    return "cover"
  }

  // Usamos el índice del color seleccionado para mostrar la imagen correspondiente
  const currentImage = images[selectedColorIndex] || images[0] || "/placeholder.svg"

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImageContainer}>
        {imageError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              color: "#666",
              fontSize: "1rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
              <div>Error al cargar imagen</div>
              <div style={{ fontSize: "0.75rem", marginTop: "0.5rem", color: "#999" }}>Ruta: {currentImage}</div>
            </div>
          </div>
        ) : (
          <img
            ref={imageRef}
            src={currentImage || "/placeholder.svg"}
            alt={`${productName} - ${colors[selectedColorIndex]?.name || "Producto"}`}
            className={styles.mainImage}
            style={{
              objectFit: getImageFit(),
              opacity: imageLoaded ? 1 : 0.3,
              transition: "opacity 0.3s ease",
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
          />
        )}
      </div>

      {/* Eliminamos completamente los puntos indicadores */}
      {/* Ya no hay navegación manual de imágenes */}
    </div>
  )
}
