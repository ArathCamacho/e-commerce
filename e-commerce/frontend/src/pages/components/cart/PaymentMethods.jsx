import styles from "./PaymentMethods.module.css"

export default function PaymentMethods() {
  return (
    <div className={styles.paymentMethods}>
      <div className={`${styles.paymentCard} ${styles.visa}`}>VISA</div>
      <div className={`${styles.paymentCard} ${styles.mastercard}`}>MC</div>
      <div className={`${styles.paymentCard} ${styles.amex}`}>AMEX</div>
      <div className={`${styles.paymentCard} ${styles.paypal}`}>PP</div>
      <div className={`${styles.paymentCard} ${styles.oxxo}`}>OXXO</div>
    </div>
  )
}
