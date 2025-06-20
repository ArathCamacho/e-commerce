"use client"

import { useState, useRef } from "react"
import styles from "./ProductImageGallery.module.css"

export default function ProductImageGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const imageRef = useRef(null)

  // Función para manejar la carga de la imagen
  const handleImageLoad = (e) => {
    console.log("✅ Imagen cargada exitosamente:", e.target.src)
    setImageLoaded(true)
    setImageError(false)
    const { naturalWidth, naturalHeight } = e.target
    setImageDimensions({ width: naturalWidth, height: naturalHeight })
  }

  // Función para manejar errores de carga
  const handleImageError = (e) => {
    console.error("❌ Error cargando imagen:", e.target.src)
    setImageError(true)
    setImageLoaded(false)
  }

  // Determinar si usar cover o contain basado en las dimensiones
  const getImageFit = () => {
    if (!imageLoaded || !imageDimensions.width || !imageDimensions.height) {
      return "cover"
    }

    const aspectRatio = imageDimensions.width / imageDimensions.height
    const containerAspectRatio = 1 // Asumiendo contenedor cuadrado

    // Si la imagen es muy diferente al contenedor, usar contain
    if (aspectRatio > 2 || aspectRatio < 0.5) {
      return "contain"
    }

    return "cover"
  }

  // FORZAR la imagen de Modelo.png directamente
  const currentImage = "/images/productImagesTest/Modelo.png"

  console.log("🖼️ Intentando cargar imagen:", currentImage)
  console.log("📦 Images prop recibido:", images)

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImageContainer}>
        {imageError ? (
          // Imagen de fallback si hay error
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
            alt={productName || "Producto"}
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

        {/* Indicador de carga mejorado */}
        {!imageLoaded && !imageError && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#666",
              fontSize: "0.875rem",
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>🔄</div>
            <div>Cargando imagen...</div>
          </div>
        )}
      </div>

      {/* Navegación de imágenes si hay múltiples */}
      {images && images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
                border: "none",
                backgroundColor: index === currentImageIndex ? "#000" : "rgba(0,0,0,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
