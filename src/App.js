import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { id } = useParams(); // Obtén el ID del contacto de los parámetros de la URL
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    // Verifica si estás editando un contacto existente
    if (id) {
      fetchContacto();
    }
  }, [id]);

  const fetchContacto = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el contacto');
      }
      const data = await response.json();
      setNombre(data.full_name);
      setEmail(data.email);
      setTelefono(data.phone);
      setDireccion(data.address);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactoData = {
      full_name: nombre,
      email: email,
      phone: telefono,
      address: direccion,
      agenda_slug: 'my_agenda' // Utiliza el slug de tu preferencia
    };

    try {
      let response;
      if (id) {
        // Si hay un ID, entonces estamos editando un contacto existente
        response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactoData)
        });
      } else {
        // Si no hay un ID, entonces estamos agregando un nuevo contacto
        response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactoData)
        });
      }

      if (response.ok) {
        navigate('/'); // Redirige a la página de lista de contactos después de agregar/editar el contacto
      } else {
        console.error('Error al guardar el contacto:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar' : 'Agregar'} Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
        <div>
          <Link to="/" className="btn btn-link">Volver a la lista de Contactos</Link>
        </div>
      </form>
    </div>
  );
}

export default App;
