import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/themeContext"
import styles from "./Hero.module.css"

const carouselImages = [
  "/images/carousel/carrousel1.jpg",
  "/images/carousel/carrousel2.jpg",
  "/images/carousel/carrousel3.jpg",
  "/images/carousel/carrousel4.jpg",
  "/images/carousel/carrousel5.jpg",
]

export default function Hero() {
  const { darkMode } = useTheme()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
        setIsTransitioning(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>

      {/* Carrusel de imágenes */}
      <div className={styles.carouselContainer}>
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Carousel image ${index + 1}`}
            className={`${styles.carouselImage} ${
              index === currentImageIndex ? styles.carouselImageActive : ""
            } ${isTransitioning ? styles.carouselImageTransition : ""}`}
            style={{
              filter: darkMode
                ? "sepia(25%) hue-rotate(15deg) brightness(70%) contrast(1.15) saturate(0.7) blur(0.8px)"
                : "sepia(35%) hue-rotate(20deg) brightness(85%) contrast(1.1) saturate(0.65) blur(0.8px)",
            }}
          />
        ))}
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>VISTE COMO NOSOTROS</h1>
        <p className={styles.heroSubtitle}>Te traemos lo más reciente de nuestro catálogo con precios ideales</p>
        <div className={styles.heroButtons}>
          <div onClick={() => navigate("/coleccion")} className={styles.heroButton}>
            <span className={styles.heroButtonText}>Ver colección</span>
            <div className={styles.heroButtonShine}></div>
          </div>
          <div onClick={() => navigate("/novedades")} className={styles.heroButton}>
            <span className={styles.heroButtonText}>Ver novedades</span>
            <div className={styles.heroButtonShine}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
