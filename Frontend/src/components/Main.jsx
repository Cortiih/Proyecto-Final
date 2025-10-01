
import React, { useEffect, useState } from 'react'
import "./Main.css"
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';


export const Main = () => {

  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/hotels')
      .then(res => res.json())
      .then(data => {
        console.log("Hoteles paginados:", data);
        setHotels(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error(error));
  }, [page]);


  return (
    <main className='main'>
      <section className="search-section">
        <h2>Buscar ofertas en Hoteles y Cabañas</h2>
        <div className='search-box'>
          <input
            type="text"
            placeholder="Buscar hoteles..."
            className="search-input"
          />
          <button className="search-btn">Buscar</button>
        </div>
      </section>

      <section className="categories-section">
        <h2>Categorías</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="/Hotel-foto.png" alt="Hoteles" />
            <p>Hoteles</p>
          </div>
          <div className="category-card">
            <img src="/Cabaña-foto.png" alt="Cabañas" />
            <p>Cabañas</p>
          </div>
          <div className="category-card">
            <img src="/Departamento-foto.png" alt="Departamentos" />
            <p>Departamentos</p>
          </div>
        </div>
      </section>

      <section className="recommendations">
        <h2>Recomendaciones</h2>
        <div className="recommendations-grid">
          {hotels.map(hotel => (
            <Link to={`/hotel/${hotel.id}`} className="recommendation-card" key={hotel.id}>
              <img src={hotel.images[0]} alt={hotel.name} />
              <div className='hotel-info'>
                <h3>{hotel.name}</h3>
                <p><FaMapMarkerAlt color="#683b1f" /> {hotel.location}</p>
                <p>{Array.from({ length: hotel.stars }).map((_, i) => (
                  <FaStar key={i} color="gold" />
                ))}</p>
                <p>${hotel.pricePerNight} / noche</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button onClick={() => setPage(0)} disabled={page === 0}>⏮ Inicio</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>◀ Anterior</button>
          {Array.from({ length: totalPages }, (_, i) => i)
            .filter(i => i >= page - 2 && i <= page + 2) // solo 5 botones visibles
            .map(i => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={page === i ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Siguiente ▶</button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>⏭ Final</button>
        </div>
      </section>



    </main>
  )
}




