import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./pages/context/themeContext"
import InicioSesion from "./pages/inicioSesion"
import Registrarse from "./pages/signUp"
import MainPage from "./pages/home"
import Carrito from "./pages/Carrito"


import "./pages/styles/global.css"


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registrarse />} />
          <Route path="/principal" element={<MainPage />} />
          <Route path="/carrito" element={<Carrito />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

// Hola