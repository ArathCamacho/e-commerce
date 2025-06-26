"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import WishlistHeader from "../components/wishlist/WishlistHeader"
import WishlistEmptyState from "../components/wishlist/WishlistEmptyState"
import WishlistProductGrid from "../components/wishlist/WishlistProductGrid"
import { useNotification } from "../hooks/useNotification"
import styles from "../styles/WishlistGeneral.module.css"

export default function Wishlist() {
  const { darkMode } = useTheme()
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState([])
  const { showSuccess } = useNotification()

  // Datos mock para la wishlist
  const mockWishlistItems = [
    {
      id: 1,
      name: "Playera Polo Slim Fit",
      price: 140.0,
      image: "/placeholder.svg?height=300&width=240",
      color: "Blanca",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Camisa Casual Verano",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=240",
      color: "Azul",
      addedDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Polo Texturizado",
      price: 125.0,
      image: "/placeholder.svg?height=300&width=240",
      color: "Verde",
      addedDate: "2024-01-08",
    },
    {
      id: 4,
      name: "Camiseta Básica",
      price: 45.0,
      image: "/placeholder.svg?height=300&width=240",
      color: "Negro",
      addedDate: "2024-01-05",
    },
  ]

  useEffect(() => {
    // Cargar datos directamente sin loading
    setWishlistItems(mockWishlistItems)
  }, [])

  const handleRemoveFromWishlist = (item) => {
    setWishlistItems((prev) => prev.filter((product) => product.id !== item.id))
    showSuccess(`${item.name} eliminado de tu lista de deseos`)
  }

  const handleMoveToCart = (item) => {
    showSuccess(`${item.name} agregado al carrito`)
  }

  const handleGoToProduct = (productId) => {
    navigate(`/producto/${productId}`)
  }

  const handleExploreProducts = () => {
    navigate("/")
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <Header />

      <main className={styles.mainContent} style={{ paddingTop: "6.5rem" }}>
        <div className={styles.sectionContainer}>
          <WishlistHeader itemCount={wishlistItems.length} />

          {wishlistItems.length === 0 ? (
            <WishlistEmptyState onExplore={handleExploreProducts} />
          ) : (
            <WishlistProductGrid
              items={wishlistItems}
              onRemoveItem={handleRemoveFromWishlist}
              onAddToCart={handleMoveToCart}
              onGoToProduct={handleGoToProduct}
            />
          )}
        </div>
      </main>
    </div>
  )
}
