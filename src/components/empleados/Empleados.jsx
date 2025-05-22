import { useState, useEffect } from 'react';

import './../../assets/styles/Empleados.css';

function Empleados(){

    const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', telefono: '', puesto: '' });
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
    const [modalNuevoEmpleado, setModalNuevoEmpleado] = useState(false);

    const [empleadoActual, setEmpleadoActual] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    const abrirModalEditar = (empleado) => {
        setEmpleadoActual({ ...empleado });
        setModalEditarAbierto(true);
    };

    const abrirModalEliminar = (empleado) => {
        setEmpleadoActual(empleado);
        setModalEliminarAbierto(true);
    };

    const abrirModalNuevo = () => {
        setNuevoEmpleado({ nombre: '', telefono: '', puesto: '' });
        setModalNuevoEmpleado(true);
    };

    const cerrarModal = () => {
        setModalEditarAbierto(false);
        setModalEliminarAbierto(false);
        setModalNuevoEmpleado(false);
        setEmpleadoActual(null);
    };

    const handleChange = (e) => {
        setEmpleadoActual({
            ...empleadoActual,
            [e.target.name]: e.target.value
        });
    };

    const handleNuevoChange = (e) => {
        setNuevoEmpleado({
            ...nuevoEmpleado,
            [e.target.name]: e.target.value
        });
    };

    const guardarCambios = () => {
        fetch(`http://localhost:3000/api/empleados/${empleadoActual.id_empleado}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleadoActual)
        })
            .then(res => res.json())
            .then((data) => {
                setEmpleados((prev) =>
                prev.map((emp) => (emp.id === empleadoActual.id_empleado ? data : emp))
                );
            cerrarModal();
            })
            .catch(err => console.error(err));
    };

    const eliminarEmpleado = () => {
        fetch(`http://localhost:3000/api/empleados/${empleadoActual.id_empleado}`, {
            method: 'DELETE'
        })
            .then(() => {
            setEmpleados((prev) => prev.filter((emp) => emp.id !== empleadoActual.id_empleado));
            cerrarModal();
            })
            .catch(err => console.error(err));
    };
    
    const agregarEmpleado = () => {
        fetch('http://localhost:3000/api/empleados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEmpleado)
        })
            .then(res => res.json())
            .then(data => {
            setEmpleados([...empleados, data]);
            cerrarModal();
            setNuevoEmpleado({ nombre: '', telefono: '', puesto: '' });
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/empleados')
            .then(res => res.json())
            .then(data => setEmpleados(data))
            .catch(err => console.error(err));
        }, 
    []);

    return(
        <div>
            <div className="header">
                <h1>Empleados registrados</h1>
                <button className="btn btn-nuevo" onClick={() => abrirModalNuevo()}>Nuevo empleado</button>
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
                    <tr key={emp.id_em}>
                    <td>{emp.id_empleado}</td>
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

            {/* Modal para agregar nuevo */}
            {modalNuevoEmpleado && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Agregar nuevo empleado</h2>
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={nuevoEmpleado.nombre} onChange={handleNuevoChange} />
                        </label>
                        <label>
                            Teléfono:
                            <input type="text" name="telefono" value={nuevoEmpleado.telefono} onChange={handleNuevoChange} />
                        </label>
                        <label>
                            Puesto:
                            <input type="text" name="puesto" value={nuevoEmpleado.puesto} onChange={handleNuevoChange} />
                        </label>
                        <div className="modal-buttons">
                            <button className="btn btn-nuevo" onClick={agregarEmpleado}>Guardar</button>
                            <button className="btn btn-eliminar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Empleados;