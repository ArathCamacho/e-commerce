"use client";

import { useState, useRef } from "react";
import styles from "./ProductImageGallery.module.css";

export default function ProductImageGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setImageError(false);
    setImageDimensions({ width: e.target.naturalWidth, height: e.target.naturalHeight });
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(false);
  };

  const getImageFit = () => {
    if (!imageLoaded || !imageDimensions.width || !imageDimensions.height) return "cover";
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    if (aspectRatio > 2 || aspectRatio < 0.5) return "contain";
    return "cover";
  };

  const currentImage = images[currentImageIndex] || "/placeholder.svg";

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImageContainer}>
        {imageError ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", color: "#666", fontSize: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
              <div>Error al cargar imagen</div>
              <div style={{ fontSize: "0.75rem", marginTop: "0.5rem", color: "#999" }}>Ruta: {currentImage}</div>
            </div>
          </div>
        ) : (
          <img
            ref={imageRef}
            src={currentImage}
            alt={productName || "Producto"}
            className={styles.mainImage}
            style={{ objectFit: getImageFit(), opacity: imageLoaded ? 1 : 0.3, transition: "opacity 0.3s ease" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
          />
        )}
      </div>

      {images && images.length > 1 && (
        <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", zIndex: 10 }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", border: "none", backgroundColor: index === currentImageIndex ? "#000" : "rgba(0,0,0,0.3)", cursor: "pointer", transition: "all 0.3s ease" }}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
