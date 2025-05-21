import React from 'react';
import { Link } from 'react-router-dom';
import './../assets/styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Gestión Empleados</h2>
      <nav>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/inicio/empleados">Empleados</Link></li>
          <li><Link to="/">Cerrar sesión</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
