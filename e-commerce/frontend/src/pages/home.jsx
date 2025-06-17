"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "./context/themeContext"
import styles from "./styles/home.module.css"
import UserDropdown from "./components/userDropDown"

// Agregar después de los imports existentes
const carouselImages = [
  "/images/carousel/carrousel1.jpg",
  "/images/carousel/carrousel2.jpg",
  "/images/carousel/carrousel3.jpg",
  "/images/carousel/carrousel4.jpg",
  "/images/carousel/carrousel5.jpg",
]

// Simulamos los iconos de Lucide React con SVGs simples
const Heart = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const Search = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const ShoppingBag = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const User = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Moon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Sun = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const Truck = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

const Shield = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const RefreshCw = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <polyline points="23,4 23,10 17,10" />
    <polyline points="1,20 1,14 7,14" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
)

const Star = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const Mail = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const Instagram = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const Facebook = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Twitter = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const Youtube = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
  </svg>
)

function CategoryCard({ image, title, href }) {
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

function ProductCard({ image, name, price, darkMode }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img src={image || "/placeholder.svg?height=400&width=300"} alt={name} className={styles.productImage} />
        <div className={styles.productImageOverlay}></div>
        <button aria-label="Add to wishlist" className={styles.wishlistButton}>
          <Heart size={16} className={styles.wishlistIcon} />
        </button>
        <div className={styles.productRing}></div>
      </div>
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{price}</p>
    </div>
  )
}

function BestSellerCard({ image, name, price, originalPrice, darkMode }) {
  return (
    <div className={styles.bestSellerCard}>
      <div className={styles.bestSellerImageContainer}>
        <div className={styles.bestSellerBadge}>MÁS VENDIDO</div>
        <img src={image || "/placeholder.svg?height=400&width=300"} alt={name} className={styles.bestSellerImage} />
        <button aria-label="Add to wishlist" className={styles.wishlistButton}>
          <Heart size={16} className={styles.wishlistIcon} />
        </button>
      </div>
      <h3 className={styles.bestSellerName}>{name}</h3>
      <div className={styles.bestSellerPrices}>
        <p className={styles.bestSellerPrice}>{price}</p>
        <p className={styles.bestSellerOriginalPrice}>{originalPrice}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, darkMode }) {
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

export default function MainPage() {
  const { darkMode, toggleDarkMode, mounted } = useTheme()
  const [email, setEmail] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("none")
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()

  // Agregar el estado del carrusel después de los estados existentes:
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determinar la dirección del scroll
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
        setIsTransitioning(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  const getHeaderOpacity = () => {
    const maxScroll = 150 // Reducir el rango para que sea más rápido
    const minOpacity = 0.85 // Más opaco (antes era 0.6)
    const maxOpacity = 1

    // Si está scrolleando hacia abajo, hacerlo ligeramente translúcido
    if (scrollDirection === "down" && scrollY > 50) {
      const opacity = Math.max(minOpacity, maxOpacity - (scrollY / maxScroll) * 0.15)
      return opacity
    }
    // Si está scrolleando hacia arriba, restaurar opacidad
    else if (scrollDirection === "up" || scrollY <= 50) {
      const opacity = Math.min(maxOpacity, minOpacity + ((maxScroll - scrollY) / maxScroll) * 0.15)
      return opacity
    }

    // Por defecto, opacidad completa
    return maxOpacity
  }

  const handleLoginClick = () => {
    navigate("/login")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Navigation */}
      <header
        className={styles.header}
        style={{
          backgroundColor: darkMode
            ? `rgba(23, 23, 23, ${getHeaderOpacity()})`
            : `rgba(255, 255, 255, ${getHeaderOpacity()})`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className={styles.headerContent}>
          <div onClick={() => navigate("/")} className={styles.logo}>
            <div className={styles.logoContainer}>
              <div className={styles.logoCircle}>V</div>
              <span className={styles.logoText}>
                <span className={styles.logoTextGreen}>VAND</span>
                <span className={styles.logoTextBold}>ENTIALS</span>
              </span>
            </div>
          </div>

          <nav className={styles.nav}>
            {["Mujer", "Hombre", "Niños", "Novedades", "Ofertas"].map((item) => (
              <div key={item} onClick={() => navigate(`/${item.toLowerCase()}`)} className={styles.navItem}>
                {item}
                <span className={styles.navUnderline}></span>
              </div>
            ))}
          </nav>

          <div className={styles.headerActions}>
            {[
              { icon: Heart, label: "Wishlist" },
              { icon: Search, label: "Search" },
              { icon: ShoppingBag, label: "Cart" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} aria-label={label} className={styles.headerButton} style={{ outline: "none" }}>
                <Icon size={20} />
              </button>
            ))}

            <UserDropdown />

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={styles.themeToggle}
              style={{ outline: "none" }}
            >
              <div className={styles.themeToggleContent}>
                <Sun
                  size={20}
                  className={`${styles.themeIcon} ${darkMode ? styles.themeIconHidden : styles.themeIconVisible}`}
                />
                <Moon
                  size={20}
                  className={`${styles.themeIcon} ${darkMode ? styles.themeIconVisible : styles.themeIconHidden}`}
                />
              </div>
              <div className={styles.themeToggleGradient}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Rotating Announcements Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementScroll}>
          <span className={styles.announcementItem}>🎉 OFERTAS ESPECIALES - HASTA 50% DE DESCUENTO</span>
          <span className={styles.announcementItem}>✨ ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN</span>
          <span className={styles.announcementItem}>🔥 NUEVA COLECCIÓN PRIMAVERA-VERANO 2024</span>
          <span className={styles.announcementItem}>💎 MIEMBROS VIP - 20% DESCUENTO ADICIONAL</span>
          <span className={styles.announcementItem}>🚚 ENTREGA EXPRESS EN HERMOSILLO</span>
          <span className={styles.announcementItem}>🎉 OFERTAS ESPECIALES - HASTA 50% DE DESCUENTO</span>
          <span className={styles.announcementItem}>✨ ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN</span>
          <span className={styles.announcementItem}>🔥 NUEVA COLECCIÓN PRIMAVERA-VERANO 2024</span>
          <span className={styles.announcementItem}>💎 MIEMBROS VIP - 20% DESCUENTO ADICIONAL</span>
          <span className={styles.announcementItem}>🚚 ENTREGA EXPRESS EN HERMOSILLO</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        {/* Carrusel de imágenes */}
        <div className={styles.carouselContainer}>
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Carousel image ${index + 1}`}
              className={`${styles.carouselImage} ${
                index === currentImageIndex ? styles.carouselImageActive : ""
              } ${isTransitioning ? styles.carouselImageTransition : ""}`}
              style={{
                filter: darkMode
                  ? "sepia(25%) hue-rotate(15deg) brightness(70%) contrast(1.15) saturate(0.7) blur(0.8px)"
                  : "sepia(35%) hue-rotate(20deg) brightness(85%) contrast(1.1) saturate(0.65) blur(0.8px)",
              }}
            />
          ))}
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>VISTE COMO NOSOTROS</h1>
          <p className={styles.heroSubtitle}>Te traemos lo más reciente de nuestro catálogo con precios ideales</p>
          <div className={styles.heroButtons}>
            <div onClick={() => navigate("/coleccion")} className={styles.heroButton}>
              <span className={styles.heroButtonText}>Ver colección</span>
              <div className={styles.heroButtonShine}></div>
            </div>
            <div onClick={() => navigate("/novedades")} className={styles.heroButton}>
              <span className={styles.heroButtonText}>Ver novedades</span>
              <div className={styles.heroButtonShine}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>CATEGORÍAS RECOMENDADAS</h2>
            <p className={styles.sectionSubtitle}>Encuentra lo que necesites en nuestras secciones</p>
          </div>

          <div className={styles.categoriesGrid}>
            <CategoryCard image="/images/categories/categoria1.png" title="SUDADERAS" href="/categoria/sudaderas" />
            <CategoryCard image="/images/categories/categoria2.png" title="BERMUDAS" href="/categoria/bermudas" />
            <CategoryCard image="/images/categories/categoria3.png" title="JEANS" href="/categoria/jeans" />
            <CategoryCard image="/images/categories/categoria4.png" title="SUÉTERES" href="/categoria/sueteres" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>PRODUCTOS DESTACADOS</h2>
            <div onClick={() => navigate("/productos")} className={styles.sectionLink}>
              VER TODOS
              <span className={styles.sectionLinkUnderline}></span>
            </div>
          </div>

          <div className={styles.productsGrid}>
            <ProductCard image="/images/TestImage.png" name="Camisa de Verano" price="$599" />
            <ProductCard image="/images/TestImage.png" name="Zapatos Casuales" price="$1,299" />
            <ProductCard image="/images/TestImage.png" name="Bufanda de Lino" price="$399" />
            <ProductCard image="/images/TestImage.png" name="Pantalón Casual" price="$899" />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className={styles.bestSellersSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>MÁS VENDIDOS</h2>
            <div onClick={() => navigate("/mas-vendidos")} className={styles.sectionLink}>
              VER TODOS
              <span className={styles.sectionLinkUnderline}></span>
            </div>
          </div>

          <div className={styles.productsGrid}>
            <BestSellerCard
              image="/images/TestImage.png"
              name="Chaqueta Denim Clásica"
              price="$1,599"
              originalPrice="$1,999"
            />
            <BestSellerCard
              image="/images/TestImage.png"
              name="Vestido Floral Elegante"
              price="$1,299"
              originalPrice="$1,799"
            />
            <BestSellerCard
              image="/images/TestImage.png"
              name="Sneakers Urbanos"
              price="$1,799"
              originalPrice="$2,399"
            />
            <BestSellerCard
              image="/images/TestImage.png"
              name="Bolso de Cuero Premium"
              price="$2,599"
              originalPrice="$3,199"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.featuresGrid}>
            <FeatureCard icon={Truck} title="Envío Gratis" description="En compras superiores a $800 MXN" />
            <FeatureCard icon={RefreshCw} title="Devoluciones" description="30 días para cambios y devoluciones" />
            <FeatureCard icon={Shield} title="Compra Segura" description="Protección total en tus pagos" />
            <FeatureCard icon={Star} title="Calidad Premium" description="Materiales de la más alta calidad" />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.sectionContainer}>
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
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.sectionContainer}>
          <div className={styles.footerGrid}>
            {/* Brand */}
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoCircle}>V</div>
                <span className={styles.footerLogoText}>
                  <span className={styles.footerLogoGreen}>VAND</span>
                  <span>ENTIALS</span>
                </span>
              </div>
              <p className={styles.footerDescription}>
                Tu destino para la moda más actual y tendencias que definen tu estilo único en Hermosillo.
              </p>
              <div className={styles.socialLinks}>
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <a key={index} href={href} className={styles.socialLink}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerColumnTitle}>Tienda</h3>
              <ul className={styles.footerList}>
                {["Mujer", "Hombre", "Niños", "Accesorios", "Ofertas", "Nueva Colección"].map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.footerLink}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerColumnTitle}>Atención al Cliente</h3>
              <ul className={styles.footerList}>
                {[
                  "Contacto",
                  "Envíos y Devoluciones",
                  "Guía de Tallas",
                  "FAQ",
                  "Términos y Condiciones",
                  "Política de Privacidad",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.footerLink}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerColumnTitle}>Contacto</h3>
              <div className={styles.contactInfo}>
                <p>📧 info@vandentials.com</p>
                <p>📞 (662) 123-4567</p>
                <p>📍 Hermosillo, Sonora, México</p>
                <p>🕒 Lun - Sáb: 9:00 - 20:00</p>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>© 2024 Vandentials. Todos los derechos reservados.</p>
            <div className={styles.footerBottomLinks}>
              <a href="#" className={styles.footerBottomLink}>
                Política de Privacidad
              </a>
              <a href="#" className={styles.footerBottomLink}>
                Términos de Uso
              </a>
              <a href="#" className={styles.footerBottomLink}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
