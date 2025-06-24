import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./pages/context/themeContext"
import { AuthProvider } from "./pages/context/AuthContext";
import Home from "./pages/Home/index"
import Carrito from "./pages/Cart/index"
import InicioSesion from "./pages/inicioSesion"
import Registrarse from "./pages/signUp"
import ProductDetail from "./pages/ProductDetail/index"
import Checkout from "./pages/Checkout/index"
import "./pages/styles/global.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/register" element={<Registrarse />} />
            <Route path="/principal" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/producto/:productId" element={<ProductDetail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
