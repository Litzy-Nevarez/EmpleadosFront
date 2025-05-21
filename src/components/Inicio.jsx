import { Outlet, useLocation } from 'react-router-dom';

import './../assets/styles/Inicio.css';
import Sidebar from './Sidebar';

function Inicio() {
    const location = useLocation();

    // Verifica si estás en la ruta exacta de /inicio
    const isInicio = location.pathname === '/inicio';

    return (
        <div className="inicio-container">
        <Sidebar />
        <div className="contenido-principal">
            {isInicio && <h1>Bienvenido(a)</h1>}
            <Outlet />
        </div>
        </div>
    );
}

export default Inicio;
