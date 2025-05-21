import { useState } from 'react';

import './../../assets/styles/Empleados.css';

function Empleados(){

    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
    const [empleadoActual, setEmpleadoActual] = useState(null);

    const empleados = [
        { id: 1, nombre: 'Juan Pérez', telefono: '618-123-4567', puesto: 'Contador' },
        { id: 2, nombre: 'María García', telefono: '618-987-6543', puesto: 'Recursos Humanos' },
        { id: 3, nombre: 'Carlos Sánchez', telefono: '618-456-7890', puesto: 'Ingeniero' },
    ];

    const abrirModalEditar = (empleado) => {
        setEmpleadoActual({ ...empleado });
        setModalEditarAbierto(true);
    };

    const abrirModalEliminar = (empleado) => {
        setEmpleadoActual(empleado);
        setModalEliminarAbierto(true);
    };

    const cerrarModal = () => {
        setModalEditarAbierto(false);
        setModalEliminarAbierto(false);
        setEmpleadoActual(null);
    };

    const handleChange = (e) => {
        setEmpleadoActual({
        ...empleadoActual,
        [e.target.name]: e.target.value,
        });
    };

    const guardarCambios = () => {
        setEmpleados((prev) =>
        prev.map((emp) => (emp.id === empleadoActual.id ? empleadoActual : emp))
        );
        cerrarModal();
    };

    const eliminarEmpleado = () => {
        setEmpleados((prev) => prev.filter((emp) => emp.id !== empleadoActual.id));
        cerrarModal();
    };

    return(
        <div>
            <div className="header">
                <h1>Empleados registrados</h1>
                <button className="btn btn-nuevo">Nuevo empleado</button>
            </div>
            <table className="tabla-empleados">
                <thead>
                <tr>
                    <th>ID Empleado</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Puesto</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {empleados.map((emp) => (
                    <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.nombre}</td>
                    <td>{emp.telefono}</td>
                    <td>{emp.puesto}</td>
                    <td>
                        <button className="btn btn-editar" onClick={() => abrirModalEditar(emp)}>Editar</button>
                        <button className="btn btn-eliminar" onClick={() => abrirModalEliminar(emp)}>Eliminar</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            

            {/* Modal Editar */}
            {modalEditarAbierto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Editar Empleado</h2>
                        <p><strong>ID:</strong> {empleadoActual.id}</p>
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={empleadoActual.nombre} onChange={handleChange} />
                        </label>
                        <label>
                            Teléfono:
                            <input type="text" name="telefono" value={empleadoActual.telefono} onChange={handleChange} />
                        </label>
                        <label>
                            Puesto:
                            <input type="text" name="puesto" value={empleadoActual.puesto} onChange={handleChange} />
                        </label>
                        <div className="modal-buttons">
                            <button className="btn btn-editar" onClick={guardarCambios}>Guardar</button>
                            <button className="btn btn-eliminar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Eliminar */}
            {modalEliminarAbierto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>¿Eliminar empleado?</h2>
                        <p>Estás a punto de eliminar al empleado <strong>{empleadoActual.nombre}</strong>.</p>
                        <div className="modal-buttons">
                            <button className="btn btn-eliminar" onClick={eliminarEmpleado}>Eliminar</button>
                            <button className="btn btn-editar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Empleados;