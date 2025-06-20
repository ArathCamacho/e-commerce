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

  // Mock product data - en una app real vendría de una API
  const productData = {
    "camisa-verano": {
      name: "PLAYERA POLO SLIM FIT TEXTURIZADA",
      price: 499.0,
      images: [
        "/placeholder.svg?height=600&width=500",
        "/placeholder.svg?height=600&width=500",
        "/placeholder.svg?height=600&width=500",
      ],
      colors: [
        { name: "Verde Olivo", value: "#8B9A6B", image: "/placeholder.svg?height=100&width=100" },
        { name: "Camel", value: "#C19A6B", image: "/placeholder.svg?height=100&width=100" },
        { name: "Gris", value: "#6B7280", image: "/placeholder.svg?height=100&width=100" },
        { name: "Blanco", value: "#FFFFFF", image: "/placeholder.svg?height=100&width=100" },
      ],
      sizes: ["XCH", "S", "M", "XG", "XXG"],
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
