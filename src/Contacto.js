import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Contacto({ id, nombre, direccion, telefono, email, imagenUrl, onEditar, onBorrar }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleEditar = () => {
        // Redirige al formulario de edición con el ID del contacto
        navigate(`/AñadirContacto/${id}`);
    };

    const handleBorrar = () => {
        setShowModal(true);
    };

    const confirmarBorrar = () => {
        onBorrar(id);
        setShowModal(false);
    };

    return (
        <div className="contacto-item d-flex align-items-center justify-content-between py-3 border-bottom">
            <div className="contacto-info d-flex align-items-center">
                <img src={imagenUrl} alt="Imagen de perfil" className="contacto-imagen rounded-circle me-3" />
                <div>
                    <h5 className="mb-0">{nombre}</h5>
                    <p className="mb-0"><i className="bi bi-geo-alt-fill me-1"></i> {direccion}</p>
                    <p className="mb-0"><i className="bi bi-telephone"></i> {telefono}</p>
                    <p className="mb-0"><i className="bi bi-envelope"></i> {email}</p>
                </div>
            </div>
            <div className="contacto-botones d-flex align-items-center">
                <button className="btn btn-outline-primary me-2" onClick={handleEditar}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={handleBorrar}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
            {/* Modal Bootstrap */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar eliminación</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={confirmarBorrar}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ListaContactos() {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda');
                if (!response.ok) {
                    throw new Error('Error al obtener los contactos');
                }
                const data = await response.json();
                setContactos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchContactos();
    }, []);

    const eliminarContacto = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el contacto');
            }

            setContactos(contactos.filter(contacto => contacto.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Lista de Contactos</h2>
                <Link to="/AñadirContacto" className="btn btn-success">Añadir contacto</Link>
            </div>
            {contactos.map((contacto, index) => (
                <Contacto
                    key={index}
                    id={contacto.id}
                    nombre={contacto.full_name}
                    direccion={contacto.address}
                    telefono={contacto.phone}
                    email={contacto.email}
                    imagenUrl="data:image/jpeg;base64,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" // La URL de la imagen se puede obtener de la API si está disponible
                    onEditar={() => console.log('Editar contacto:', contacto.full_name)}
                    onBorrar={eliminarContacto}
                />
            ))}
        </div>
    );
}

export default ListaContactos;
