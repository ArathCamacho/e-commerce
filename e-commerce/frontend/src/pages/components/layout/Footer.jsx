import { Instagram, Facebook, Twitter, Youtube } from "../home/Icons"
import styles from "./Footer.module.css"
import sharedStyles from "../../styles/HomeGeneral.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={sharedStyles.sectionContainer}>
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
  )
}
