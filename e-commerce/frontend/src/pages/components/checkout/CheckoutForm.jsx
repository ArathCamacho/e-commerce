"use client"

import { useState } from "react"
import CheckoutSection from "./CheckoutSection"
import PackageSection from "./PackageSection"
import styles from "./CheckoutForm.module.css"

export default function CheckoutForm({ cartItems }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  })

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
  })

  const handleEditUserInfo = () => {
    // Función para editar información del usuario
    console.log("Editar información del usuario")
  }

  const handleEditBillingAddress = () => {
    // Función para editar dirección de facturación
    console.log("Editar dirección de facturación")
  }

  const handleEditShippingInfo = () => {
    // Función para editar información de envío
    console.log("Editar información de envío")
  }

  return (
    <div className={styles.checkoutForm}>
      <CheckoutSection title="MI INFORMACIÓN" onEdit={handleEditUserInfo} isEmpty={!userInfo.name && !userInfo.email}>
        {userInfo.name && <p className={styles.infoText}>{userInfo.name}</p>}
        {userInfo.email && <p className={styles.infoText}>{userInfo.email}</p>}
        {!userInfo.name && !userInfo.email && (
          <p className={styles.emptyText}>No hay información personal configurada</p>
        )}
      </CheckoutSection>

      <CheckoutSection
        title="DIRECCIÓN DE FACTURACIÓN"
        onEdit={handleEditBillingAddress}
        isEmpty={!billingAddress.street}
      >
        {billingAddress.street && (
          <>
            <p className={styles.infoText}>{billingAddress.street}</p>
            <p className={styles.infoText}>
              {billingAddress.zipCode} {billingAddress.city}
            </p>
            <p className={styles.infoText}>{billingAddress.country}</p>
          </>
        )}
        {!billingAddress.street && <p className={styles.emptyText}>No hay dirección de facturación configurada</p>}
      </CheckoutSection>

      <CheckoutSection title="ENVÍO" onEdit={handleEditShippingInfo} isEmpty={!shippingInfo.name}>
        {shippingInfo.name && <p className={styles.infoText}>{shippingInfo.name}</p>}
        {shippingInfo.phone && <p className={styles.infoText}>{shippingInfo.phone}</p>}
        {!shippingInfo.name && <p className={styles.emptyText}>No hay información de envío configurada</p>}
      </CheckoutSection>

      <PackageSection cartItems={cartItems} />
    </div>
  )
}
