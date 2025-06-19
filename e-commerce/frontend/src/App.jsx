import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./pages/context/themeContext"
import Home from "./pages/Home/index"
import Carrito from "./pages/Cart/index"
import InicioSesion from "./pages/inicioSesion"
import Registrarse from "./pages/signUp"
import "./pages/styles/global.css"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registrarse />} />
          <Route path="/principal" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
