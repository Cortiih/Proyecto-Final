import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import "./HotelRating.css"

export const HotelRating = ({ hotelId }) => {
  const { user, getToken } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/ratings/hotel/${hotelId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las valoraciones");
        return res.json();
      })
      .then((data) => setRatings(data))
      .catch((err) => setError(err.message));
  }, [hotelId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Debes iniciar sesión para dejar una reseña");
      return;
    }

    const rating = { score, comment };

    try {
      const res = await fetch(
        `http://localhost:8080/api/ratings/hotel/${hotelId}/user/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          },
          body: JSON.stringify(rating),
        }
      );

      if (!res.ok) {
        console.error("Error al enviar reseña:", res.status);
        alert("No se pudo enviar la reseña. Verifica tus permisos.");
        return;
      }

      const newRating = await res.json();
      setRatings([...ratings, newRating]);
      setScore(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Error al enviar reseña");
    }
  }

  const average = ratings.length ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1) : "0";

  return (
    <div className="rating-section">
      <h2>Valoraciones ({ratings.length}) ⭐ {average}</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="rating-list">
        {ratings.length > 0 ? (
          ratings.map((r, i) => (
            <div key={i} className="rating-item">
              <p>
                <strong>{r.user?.name || "Usuario"}</strong> - {new Date(r.createdAt).toLocaleDateString()}
              </p>

              <div className="stars">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} color={j < r.score ? "#ffcc00" : "#ccc"} />
                ))}
              </div>
              {r.comment && <p>{r.comment}</p>}
            </div>
          ))
        ) : (
          <p className="no-ratings">Aún no hay valoraciones.</p>
        )}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="rating-form">
          <h3>Tu puntuación:</h3>
          <div className="stars-input">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={24}
                color={i < score ? "#ffcc00" : "#ccc"}
                onClick={() => setScore(i + 1)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu reseña (opcional)..."
          />
          <button type="submit">Enviar reseña</button>
        </form>
      )}
    </div>
  );
}
