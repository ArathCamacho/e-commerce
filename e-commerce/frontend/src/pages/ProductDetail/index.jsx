"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import ProductImageGallery from "../components/productDetail/ProductImageGallery"
import ProductInfo from "../components/productDetail/ProductInfo"
import styles from "../styles/ProductDetailGeneral.module.css"
import { useEffect, useState } from "react"

export default function ProductoDetallePage() {
  const { darkMode, mounted } = useTheme()
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0) // Estado compartido para el color seleccionado

  useEffect(() => {
    if (!productId) return

    setLoading(true)
    fetch(`http://localhost:3001/api/productos/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado")
        return res.json()
      })
      .then((data) => {
        console.log("Datos recibidos del backend:", data)

        if (!data.variantes || data.variantes.length === 0) {
          setProduct(null)
          setLoading(false)
          return
        }

        const adaptedProduct = {
          id: data.id,
          name: data.nombre,
          description: data.descripcion,
          price: Number(data.precio),
          images: data.variantes.map((variante) => `http://localhost:3001/${variante.imagen}`),
          colors: data.variantes.map((variante, index) => ({
            name: variante.color,
            value: variante.color.toLowerCase().replace(/\s+/g, "-"),
            image: `http://localhost:3001/${variante.imagen}`,
            index: index,
          })),
          sizes: data.tallasDisponibles.map((talla) => {
            const tallaDisponible = data.variantes.some((variante) =>
              variante.tallas.some((t) => t.talla === talla && t.disponible),
            )

            return {
              value: talla,
              available: tallaDisponible,
            }
          }),
          variantes: data.variantes,
          rawData: data,
        }

        console.log("Producto adaptado:", adaptedProduct)
        setProduct(adaptedProduct)
        setSelectedColorIndex(0) // Inicializar con el primer color
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error al cargar producto:", error)
        setProduct(null)
        setLoading(false)
      })
  }, [productId])

  // Función para manejar el cambio de color desde ProductInfo
  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex)
  }

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <Header />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <Header />
        <div className={styles.notFound}>
          <h1>Producto no encontrado</h1>
          <p>El producto solicitado no existe o no tiene variantes disponibles.</p>
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
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            colors={product.colors}
            selectedColorIndex={selectedColorIndex} // Pasamos el índice del color seleccionado
          />
          <ProductInfo
            name={product.name}
            description={product.description}
            price={product.price}
            colors={product.colors}
            sizes={product.sizes}
            variantes={product.variantes}
            selectedColorIndex={selectedColorIndex} // Pasamos el índice actual
            onColorChange={handleColorChange} // Función para cambiar el color
          />
        </div>
      </main>
    </div>
  )
}
