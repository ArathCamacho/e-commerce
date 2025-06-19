import { useState } from "react"
import { Mail } from "./Icons"
import styles from "./Newsletter.module.css"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContent}>
        <Mail size={48} className={styles.newsletterIcon} />
        <h2 className={styles.newsletterTitle}>SUSCRÍBETE A NUESTRO NEWSLETTER</h2>
        <p className={styles.newsletterSubtitle}>
          Recibe las últimas tendencias, ofertas exclusivas y novedades directamente en tu email
        </p>

        <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email aquí..."
            className={styles.newsletterInput}
            required
          />
          <button type="submit" className={styles.newsletterButton}>
            Suscribirse
          </button>
        </form>

        <p className={styles.newsletterDisclaimer}>
          Al suscribirte aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  )
}
