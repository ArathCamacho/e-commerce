import { useNavigate } from "react-router-dom"
import styles from "./CategoryCard.module.css"

export default function CategoryCard({ image, title, href }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <div onClick={handleClick} className={styles.categoryCard}>
      <img src={image || "/placeholder.svg?height=300&width=300"} alt={title} className={styles.categoryImage} />
      <div className={styles.categoryOverlay}></div>
      <div className={styles.categoryGradient}></div>
      <div className={styles.categoryContent}>
        <h3 className={styles.categoryTitle}>{title}</h3>
      </div>
    </div>
  )
}
