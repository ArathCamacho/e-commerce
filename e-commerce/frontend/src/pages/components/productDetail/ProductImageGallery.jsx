"use client"

import { useState } from "react"
import styles from "./ProductImageGallery.module.css"

export default function ProductImageGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImageContainer}>
        <img src={images[currentImageIndex] || "/placeholder.svg"} alt={productName} className={styles.mainImage} />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`${styles.thumbnail} ${index === currentImageIndex ? styles.thumbnailActive : ""}`}
            >
              <img src={image || "/placeholder.svg"} alt={`${productName} ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
