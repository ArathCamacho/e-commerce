import { useState } from "react";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ name, price, colors, sizes }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    alert(`Producto agregado:\n${name}\nColor: ${colors[selectedColor].name}\nTalla: ${selectedSize}\nPrecio: $${price.toFixed(2)}`);
    // Aquí se puede agregar lógica para llamar API y agregar al carrito
  };

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productName}>{name}</h1>
      <p className={styles.productPrice}>${price.toFixed(2)}</p>

      <div className={styles.colorSection}>
        <h3 className={styles.sectionTitle}>Color: {colors[selectedColor].name}</h3>
        <div className={styles.colorOptions}>
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`${styles.colorOption} ${index === selectedColor ? styles.colorOptionSelected : ""}`}
            >
              <img src={color.image || "/placeholder-image.png"} alt={color.name} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sizeSection}>
        <h3 className={styles.sectionTitle}>SELECCIONE LA TALLA</h3>
        <div className={styles.sizeOptions}>
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => size.available && setSelectedSize(size.value)}
              className={`${styles.sizeOption} ${
                selectedSize === size.value ? styles.sizeOptionSelected : ""
              } ${!size.available ? styles.sizeOptionUnavailable : ""}`}
              disabled={!size.available}
            >
              {size.value}
              {!size.available && <span className={styles.unavailableLine}></span>}
            </button>
          ))}
        </div>
        <button className={styles.sizeGuideButton}>GUÍA DE TALLAS</button>
      </div>

      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        AGREGAR
      </button>
    </div>
  );
}
