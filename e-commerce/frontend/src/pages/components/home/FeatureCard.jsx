import styles from "./FeatureCard.module.css"

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <Icon className={styles.featureIconSvg} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  )
}
