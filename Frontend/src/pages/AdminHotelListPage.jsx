import React, { useEffect, useState } from "react";
import "./AdminHotelListPage.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


export const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const { getToken } = useAuth();


  const fetchHotels = () => {
    fetch("http://localhost:8080/api/hotels/all")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data); 
      })
      .catch((err) => console.error("Error cargando hoteles:", err));
    }

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este hotel?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    fetch(`http://localhost:8080/api/hotels/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
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
}
