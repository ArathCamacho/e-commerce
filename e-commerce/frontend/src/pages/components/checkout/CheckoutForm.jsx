"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import CheckoutSection from "./CheckoutSection"
import PackageSection from "./PackageSection"
import styles from "./CheckoutForm.module.css"

export default function CheckoutForm({ cartItems }) {
  const { user, token, isAuthenticated } = useAuth()

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México",
  })

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México",
  })

  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showBillingForm, setShowBillingForm] = useState(false)
  const [showShippingForm, setShowShippingForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Cargar información del usuario autenticado
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated()) {
        // Cargar información básica del usuario
        setUserInfo({
          name: user.username,
          email: user.email,
          phone: "",
        })

        // Cargar información de checkout desde la API
        try {
          setLoading(true)
          const response = await fetch("http://localhost:3001/api/checkout/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const checkoutData = await response.json()

            // Actualizar teléfono de contacto
            setUserInfo((prev) => ({
              ...prev,
              phone: checkoutData.telefono_contacto || "",
            }))

            // Actualizar dirección de facturación
            setBillingAddress({
              street: checkoutData.calle_facturacion || "",
              city: checkoutData.ciudad_facturacion || "",
              state: checkoutData.estado_facturacion || "",
              zipCode: checkoutData.codigo_postal_facturacion || "",
              country: checkoutData.pais_facturacion || "México",
            })

            // Actualizar información de envío
            setShippingInfo({
              name: checkoutData.nombre_envio || "",
              phone: checkoutData.telefono_envio || "",
              street: checkoutData.calle_envio || "",
              city: checkoutData.ciudad_envio || "",
              state: checkoutData.estado_envio || "",
              zipCode: checkoutData.codigo_postal_envio || "",
              country: checkoutData.pais_envio || "México",
            })

            setSameAsBilling(checkoutData.misma_direccion_facturacion)
          }
        } catch (error) {
          console.error("Error cargando información de checkout:", error)
        } finally {
          setLoading(false)
        }
      } else {
        // Usuario no autenticado, cargar desde localStorage
        const savedUserInfo = localStorage.getItem("checkout_user_info")
        const savedBillingAddress = localStorage.getItem("checkout_billing_address")
        const savedShippingInfo = localStorage.getItem("checkout_shipping_info")

        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo))
        }
        if (savedBillingAddress) {
          setBillingAddress(JSON.parse(savedBillingAddress))
        }
        if (savedShippingInfo) {
          setShippingInfo(JSON.parse(savedShippingInfo))
        }
      }
    }

    loadUserData()
  }, [user, token, isAuthenticated])

  // Función para guardar información en la API o localStorage
  const saveCheckoutInfo = async (updatedData) => {
    if (isAuthenticated()) {
      try {
        const response = await fetch("http://localhost:3001/api/checkout/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        })

        if (!response.ok) {
          throw new Error("Error guardando información")
        }
      } catch (error) {
        console.error("Error guardando en API:", error)
        // Fallback a localStorage si falla la API
        localStorage.setItem("checkout_user_info", JSON.stringify(userInfo))
        localStorage.setItem("checkout_billing_address", JSON.stringify(billingAddress))
        localStorage.setItem("checkout_shipping_info", JSON.stringify(shippingInfo))
      }
    } else {
      // Usuario no autenticado, guardar en localStorage
      localStorage.setItem("checkout_user_info", JSON.stringify(userInfo))
      localStorage.setItem("checkout_billing_address", JSON.stringify(billingAddress))
      localStorage.setItem("checkout_shipping_info", JSON.stringify(shippingInfo))
    }
  }

  const handleEditUserInfo = () => {
    setShowUserForm(!showUserForm)
  }

  const handleEditBillingAddress = () => {
    setShowBillingForm(!showBillingForm)
  }

  const handleEditShippingInfo = () => {
    setShowShippingForm(!showShippingForm)
  }

  const handleSaveUserInfo = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedUserInfo = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    }

    setUserInfo(updatedUserInfo)
    setShowUserForm(false)

    // Preparar datos para la API
    const checkoutData = {
      telefono_contacto: updatedUserInfo.phone,
      calle_facturacion: billingAddress.street,
      ciudad_facturacion: billingAddress.city,
      estado_facturacion: billingAddress.state,
      codigo_postal_facturacion: billingAddress.zipCode,
      pais_facturacion: billingAddress.country,
      nombre_envio: shippingInfo.name,
      telefono_envio: shippingInfo.phone,
      calle_envio: shippingInfo.street,
      ciudad_envio: shippingInfo.city,
      estado_envio: shippingInfo.state,
      codigo_postal_envio: shippingInfo.zipCode,
      pais_envio: shippingInfo.country,
      misma_direccion_facturacion: sameAsBilling,
    }

    await saveCheckoutInfo(checkoutData)
  }

  const handleSaveBillingAddress = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedBillingAddress = {
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
    }

    setBillingAddress(updatedBillingAddress)
    setShowBillingForm(false)

    const checkoutData = {
      telefono_contacto: userInfo.phone,
      calle_facturacion: updatedBillingAddress.street,
      ciudad_facturacion: updatedBillingAddress.city,
      estado_facturacion: updatedBillingAddress.state,
      codigo_postal_facturacion: updatedBillingAddress.zipCode,
      pais_facturacion: updatedBillingAddress.country,
      nombre_envio: shippingInfo.name,
      telefono_envio: shippingInfo.phone,
      calle_envio: shippingInfo.street,
      ciudad_envio: shippingInfo.city,
      estado_envio: shippingInfo.state,
      codigo_postal_envio: shippingInfo.zipCode,
      pais_envio: shippingInfo.country,
      misma_direccion_facturacion: sameAsBilling,
    }

    await saveCheckoutInfo(checkoutData)
  }

  const handleSaveShippingInfo = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedShippingInfo = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
    }

    setShippingInfo(updatedShippingInfo)
    setShowShippingForm(false)

    const checkoutData = {
      telefono_contacto: userInfo.phone,
      calle_facturacion: billingAddress.street,
      ciudad_facturacion: billingAddress.city,
      estado_facturacion: billingAddress.state,
      codigo_postal_facturacion: billingAddress.zipCode,
      pais_facturacion: billingAddress.country,
      nombre_envio: updatedShippingInfo.name,
      telefono_envio: updatedShippingInfo.phone,
      calle_envio: updatedShippingInfo.street,
      ciudad_envio: updatedShippingInfo.city,
      estado_envio: updatedShippingInfo.state,
      codigo_postal_envio: updatedShippingInfo.zipCode,
      pais_envio: shippingInfo.country,
      misma_direccion_facturacion: sameAsBilling,
    }

    await saveCheckoutInfo(checkoutData)
  }

  // Verificar si hay información completa
  const hasUserInfo = userInfo.name && userInfo.email
  const hasBillingAddress =
    billingAddress.street && billingAddress.city && billingAddress.state && billingAddress.zipCode
  const hasShippingInfo = shippingInfo.name && shippingInfo.phone

  if (loading) {
    return <div className={styles.loading}>Cargando información...</div>
  }

  return (
    <div className={styles.checkoutForm}>
      <CheckoutSection title="MI INFORMACIÓN" onEdit={handleEditUserInfo} isEmpty={!hasUserInfo}>
        {userInfo.name && userInfo.email ? (
          <>
            <p className={styles.infoText}>{userInfo.name}</p>
            <p className={styles.infoText}>{userInfo.email}</p>
            {userInfo.phone && <p className={styles.infoText}>{userInfo.phone}</p>}
          </>
        ) : (
          <p className={styles.emptyText}>No hay información personal configurada</p>
        )}

        {showUserForm && (
          <form onSubmit={handleSaveUserInfo} className={styles.inlineForm}>
            <input
              name="name"
              placeholder="Nombre completo"
              defaultValue={userInfo.name}
              required
              readOnly={isAuthenticated()} // Solo lectura si está autenticado
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              defaultValue={userInfo.email}
              required
              readOnly={isAuthenticated()} // Solo lectura si está autenticado
            />
            <input name="phone" type="tel" placeholder="Teléfono" defaultValue={userInfo.phone} />
            <div className={styles.formButtons}>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setShowUserForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </CheckoutSection>

      <CheckoutSection title="DIRECCIÓN DE FACTURACIÓN" onEdit={handleEditBillingAddress} isEmpty={!hasBillingAddress}>
        {billingAddress.street ? (
          <>
            <p className={styles.infoText}>{billingAddress.street}</p>
            <p className={styles.infoText}>
              {billingAddress.zipCode} {billingAddress.city}, {billingAddress.state}
            </p>
            <p className={styles.infoText}>{billingAddress.country}</p>
          </>
        ) : (
          <p className={styles.emptyText}>No hay dirección de facturación configurada</p>
        )}

        {showBillingForm && (
          <form onSubmit={handleSaveBillingAddress} className={styles.inlineForm}>
            <input name="street" placeholder="Dirección completa" defaultValue={billingAddress.street} required />
            <input name="city" placeholder="Ciudad" defaultValue={billingAddress.city} required />
            <input name="state" placeholder="Estado" defaultValue={billingAddress.state} required />
            <input name="zipCode" placeholder="Código Postal" defaultValue={billingAddress.zipCode} required />
            <select name="country" defaultValue={billingAddress.country} required>
              <option value="México">México</option>
              <option value="Estados Unidos">Estados Unidos</option>
            </select>
            <div className={styles.formButtons}>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setShowBillingForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </CheckoutSection>

      <CheckoutSection title="ENVÍO" onEdit={handleEditShippingInfo} isEmpty={!hasShippingInfo}>
        {shippingInfo.name && shippingInfo.phone ? (
          <>
            <p className={styles.infoText}>{shippingInfo.name}</p>
            <p className={styles.infoText}>{shippingInfo.phone}</p>
            {shippingInfo.street && (
              <>
                <p className={styles.infoText}>{shippingInfo.street}</p>
                <p className={styles.infoText}>
                  {shippingInfo.zipCode} {shippingInfo.city}, {shippingInfo.state}
                </p>
              </>
            )}
          </>
        ) : (
          <p className={styles.emptyText}>No hay información de envío configurada</p>
        )}

        {showShippingForm && (
          <form onSubmit={handleSaveShippingInfo} className={styles.inlineForm}>
            <input name="name" placeholder="Nombre del destinatario" defaultValue={shippingInfo.name} required />
            <input name="phone" type="tel" placeholder="Teléfono" defaultValue={shippingInfo.phone} required />
            <input name="street" placeholder="Dirección de envío" defaultValue={shippingInfo.street} />
            <input name="city" placeholder="Ciudad" defaultValue={shippingInfo.city} />
            <input name="state" placeholder="Estado" defaultValue={shippingInfo.state} />
            <input name="zipCode" placeholder="Código Postal" defaultValue={shippingInfo.zipCode} />
            <div className={styles.formButtons}>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setShowShippingForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </CheckoutSection>

      <PackageSection cartItems={cartItems} />
    </div>
  )
}
