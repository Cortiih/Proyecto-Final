import React, { useEffect, useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "./FavoritesPage.css";

export const FavoritesPage = () => {
  const { user, getToken } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/api/users/${user.id}/favorites`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener favoritos");
          return res.json();
        })
        .then((data) => setFavorites(data))
        .catch((err) => console.error("Error cargando favoritos:", err));
    }
  }, [user]);


  const removeFavorite = async (hotelId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.id}/favorites/${hotelId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        setFavorites((prev) => prev.filter((h) => h.id !== hotelId));
      }
    } catch (err) {
      console.error("Error al eliminar favorito:", err);
    }
  };


  if (!user) {
    return <p style={{ textAlign: "center" }}>Inicia sesión para ver tus favoritos</p>;
  }

  return (
    <div className="favorites-container">
      <h2>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes hoteles favoritos todavía.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((hotel) => (
            <div className="favorite-card" key={hotel.id}>
              <img src={hotel.images[0]} alt={hotel.name} />
              <div className="favorite-info">
                <Link to={`/hotel/${hotel.id}`}>
                  <h3>{hotel.name}</h3>
                  <p><FaMapMarkerAlt color="#683b1f" /> {hotel.location}</p>
                  <p>
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <FaStar key={i} color="gold" />
                    ))}
                  </p>
                  <p>${hotel.pricePerNight} / noche</p>
                </Link>
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(hotel.id)}
                >
                  <FaHeart color="#e63946" /> Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
