import React, { useEffect, useState } from "react";
import "./AdminHotelListPage.css";
import { Link } from "react-router-dom";


export const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);
        setHotels(data.content || data);
      })
      .catch((err) => console.error("Error cargando hoteles:", err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este hotel?"
    );

    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/hotels/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setHotels(hotels.filter((hotel) => hotel.id !== id));
          alert("Hotel eliminado con éxito");
        } else {
          alert("Error al eliminar el hotel");
        }
      })
      .catch((err) => console.error("Error eliminando hotel:", err));
  }

  return (
    <div className="hotel-list-page">
      <h2>Lista de Hoteles</h2>
      <table className="hotel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>
                <Link to={`/admin/hotels/edit/${hotel.id}`}>
                <button className="action-btn">Editar</button>
                </Link>
                <button className="action-btn delete" onClick={() => handleDelete(hotel.id)}
                >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
