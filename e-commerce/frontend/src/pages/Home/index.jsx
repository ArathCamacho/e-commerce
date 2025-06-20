import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/themeContext"
import Header from "../components/layout/Header"
import AnnouncementBar from "../components/layout/AnnouncementBar"
import Footer from "../components/layout/Footer"
import Hero from "../components/home/Hero"
import CategoryCard from "../components/home/CategoryCard"
import ProductCard from "../components/home/ProductCard"
import BestSellerCard from "../components/home/BestSellerCard"
import FeatureCard from "../components/home/FeatureCard"
import Newsletter from "../components/home/Newsletter"
import { Truck, RefreshCw, Shield, Star } from "../components/home/Icons"
import sharedStyles from "../styles/HomeGeneral.module.css"

export default function HomePage() {
  const { darkMode, mounted } = useTheme()
  const navigate = useNavigate()

  if (!mounted) {
    return null
  }

  return (
    <div className={`${sharedStyles.container} ${darkMode ? "dark" : ""}`}>
      <Header />

      <AnnouncementBar />

      <Hero />

      {/* Categories Section */}
      <section className={`${sharedStyles.section} ${sharedStyles.sectionPrimary}`}>
        <div className={sharedStyles.sectionContainer}>
          <div className={sharedStyles.sectionHeader}>
            <h2 className={sharedStyles.sectionTitle}>CATEGORÍAS RECOMENDADAS</h2>
            <p className={sharedStyles.sectionSubtitle}>Encuentra lo que necesites en nuestras secciones</p>
          </div>

          <div className={sharedStyles.categoriesGrid}>
            <CategoryCard image="/images/categories/categoria1.png" title="SUDADERAS" href="/categoria/sudaderas" />
            <CategoryCard image="/images/categories/categoria2.png" title="BERMUDAS" href="/categoria/bermudas" />
            <CategoryCard image="/images/categories/categoria3.png" title="JEANS" href="/categoria/jeans" />
            <CategoryCard image="/images/categories/categoria4.png" title="SUÉTERES" href="/categoria/sueteres" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`${sharedStyles.section} ${sharedStyles.sectionSecondary}`}>
        <div className={sharedStyles.sectionContainer}>
          <div className={sharedStyles.sectionHeaderRow}>
            <h2 className={sharedStyles.sectionTitle}>PRODUCTOS DESTACADOS</h2>
            <div onClick={() => navigate("/productos")} className={sharedStyles.sectionLink}>
              VER TODOS
              <span className={sharedStyles.sectionLinkUnderline}></span>
            </div>
          </div>

          <div className={sharedStyles.productsGrid}>
            <ProductCard image="/images/TestImage.png" name="Camisa de Verano" price="$599" productId="camisa-verano" />
            <ProductCard
              image="/images/TestImage.png"
              name="Zapatos Casuales"
              price="$1,299"
              productId="zapatos-casuales"
            />
            <ProductCard image="/images/TestImage.png" name="Bufanda de Lino" price="$399" productId="bufanda-lino" />
            <ProductCard
              image="/images/TestImage.png"
              name="Pantalón Casual"
              price="$899"
              productId="pantalon-casual"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className={`${sharedStyles.section} ${sharedStyles.sectionPrimary}`}>
        <div className={sharedStyles.sectionContainer}>
          <div className={sharedStyles.sectionHeaderRow}>
            <h2 className={sharedStyles.sectionTitle}>MÁS VENDIDOS</h2>
            <div onClick={() => navigate("/mas-vendidos")} className={sharedStyles.sectionLink}>
              VER TODOS
              <span className={sharedStyles.sectionLinkUnderline}></span>
            </div>
          </div>

          <div className={sharedStyles.productsGrid}>
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
      <section className={`${sharedStyles.section} ${sharedStyles.sectionSecondary}`}>
        <div className={sharedStyles.sectionContainer}>
          <div className={sharedStyles.featuresGrid}>
            <FeatureCard icon={Truck} title="Envío Gratis" description="En compras superiores a $800 MXN" />
            <FeatureCard icon={RefreshCw} title="Devoluciones" description="30 días para cambios y devoluciones" />
            <FeatureCard icon={Shield} title="Compra Segura" description="Protección total en tus pagos" />
            <FeatureCard icon={Star} title="Calidad Premium" description="Materiales de la más alta calidad" />
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </div>
  )
}
