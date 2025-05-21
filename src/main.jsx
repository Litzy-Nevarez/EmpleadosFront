import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx'
import Inicio from './components/Inicio.jsx'
import Empleados from './components/empleados/Empleados.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Ruta protegida con layout y ruta hija */}
        <Route path="/inicio" element={<Inicio />}>
          <Route path="empleados" element={<Empleados />} />
        </Route>

      </Routes>
    </Router>
  </StrictMode>,
)
