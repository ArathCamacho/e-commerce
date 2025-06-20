"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import ProductImageGallery from "../components/productDetail/ProductImageGallery"
import ProductInfo from "../components/productDetail/ProductInfo"
import styles from "../styles/ProductDetailGeneral.module.css"

export default function ProductoDetallePage() {
  const { darkMode, mounted } = useTheme()
  const { productId } = useParams()
  const navigate = useNavigate()

  // Mock product data - exactamente como en la imagen de referencia
  const productData = {
    "camisa-verano": {
      name: "PLAYERA POLO SLIM FIT TEXTURIZADA",
      price: 499.0,
      images: ["/placeholder-image.png"],
      colors: [
        { name: "Verde Olivo", value: "#8B9A6B", image: "../images/productImagesTest/Polo1.png" },
        { name: "Camel", value: "#C19A6B", image: "../images/productImagesTest/Polo2.png" },
        { name: "Gris", value: "#6B7280", image: "../images/productImagesTest/Polo3.png" },
        { name: "Blanco", value: "#FFFFFF", image: "../images/productImagesTest/Polo4.png" },
      ],
      sizes: [
        { value: "XCH", available: true },
        { value: "S", available: false }, // Talla tachada
        { value: "M", available: true },
        { value: "XG", available: true },
        { value: "XXG", available: true },
      ],
    },
  }

  const product = productData[productId]

  if (!mounted) {
    return null
  }

  if (!product) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <Header />
        <div className={styles.notFound}>
          <h1>Producto no encontrado</h1>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <Header />

      <main className={styles.productMain}>
        <div className={styles.productContainer}>
          <ProductImageGallery images={product.images} productName={product.name} />
          <ProductInfo name={product.name} price={product.price} colors={product.colors} sizes={product.sizes} />
        </div>
      </main>
    </div>
  )
}
