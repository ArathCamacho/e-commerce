"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import Header from "../components/layout/Header";
import ProductImageGallery from "../components/productDetail/ProductImageGallery";
import ProductInfo from "../components/productDetail/ProductInfo";
import styles from "../styles/ProductDetailGeneral.module.css";
import { useEffect, useState } from "react";

export default function ProductoDetallePage() {
  const { darkMode, mounted } = useTheme();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    fetch(`http://localhost:3001/api/productos/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => {
        // Adaptamos el producto para los componentes:
        // backend devuelve un producto con color y talla únicos,
        // aquí creamos arrays con ese color y talla para el componente.
        const adaptedProduct = {
          name: data.nombre,
          price: Number(data.precio),
          images: [`http://localhost:3001/${data.imagen}`], // URL completa para imagen
          colors: [
            {
              name: data.color,
              value: "", // Puedes mapear color a hex si quieres, o dejar vacío
              image: `http://localhost:3001/${data.imagen}`,
            },
          ],
          sizes: [
            {
              value: data.talla,
              available: true,
            },
          ],
        };
        setProduct(adaptedProduct);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <Header />
        <p>Cargando producto...</p>
      </div>
    );
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
    );
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <Header />
      <main className={styles.productMain}>
        <div className={styles.productContainer}>
          <ProductImageGallery images={product.images} productName={product.name} />
          <ProductInfo
            name={product.name}
            price={product.price}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>
      </main>
    </div>
  );
}
