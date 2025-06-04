// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './pages/inicioSesion';
import Registrarse from './pages/Registrarse';
import Principal from './pages/paginaPrincipal'; // <-- esta vista debe existir

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Registrarse />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}

export default App;
