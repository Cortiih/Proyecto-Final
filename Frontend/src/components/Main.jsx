
import React, { useEffect, useState } from 'react'
import "./Main.css"
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import WhatsAppButton from './WhatsAppButton';



export const Main = () => {

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/api/hotels')
      .then(res => res.json())
      .then(data => {
        console.log("Hoteles paginados:", data);
        setHotels(data.content);
        setFilteredHotels(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error(error));
  }, [page]);


  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);



  useEffect(() => {
    if (selectedCategories.length === 0) {
      // Si no hay filtros, muestro todos
      fetch(`http://localhost:8080/api/hotels?page=${page}`)
        .then(res => res.json())
        .then(data => {
          setHotels(data.content);
          setFilteredHotels(data.content);
          setTotalPages(data.totalPages);
        })
        .catch(err => console.error(err));
    } else {

      const categoryId = selectedCategories[0]; // una sola por ahora
      fetch(`http://localhost:8080/api/hotels/filter?categoryId=${categoryId}`)
        .then(res => res.json())
        .then(data => {
          setFilteredHotels(data);
          setTotalPages(1);
        })
        .catch(err => console.error("Error filtrando hoteles:", err));
    }
  }, [selectedCategories, page]);



  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [categoryId]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const handleSearch = () => {
    // Si no hay fechas, filtra por texto nada más
    if (!startDate || !endDate) {
      const filtered = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredHotels(filtered);
      return;
    }

    // Si hay fechas → llamar backend
    fetch(`http://localhost:8080/api/hotels/available?startDate=${startDate}&endDate=${endDate}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        // data.content contiene hasta 10 hoteles de esa página
        const filtered = data.content.filter(hotel =>
          hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
          hotel.location?.toLowerCase().includes(searchText.toLowerCase())
        );

        setHotels(data.content);
        setFilteredHotels(filtered);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.error("Error buscando por fecha:", err));
  }


  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${user.id}/favorites`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setFavorites(data.map(h => h.id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [user]);


  const handleFavorite = async (hotelId) => {
    if (!user) {
      alert("Debes iniciar sesión para marcar favoritos");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.id}/favorites/${hotelId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`, // <-- token aquí también
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        setFavorites(prev =>
          prev.includes(hotelId)
            ? prev.filter(id => id !== hotelId)
            : [...prev, hotelId]
        );
      } else {
        console.error("Error al marcar favorito");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <main className='main'>
      <section className="search-section">
        <h2>Buscar ofertas en Hoteles y Cabañas</h2>
        <p>Elegí tus fechas o escribí el nombre del alojamiento que estás buscando.</p>
        <div className='search-box'>
          <input
            list="suggestions"
            type="text"
            placeholder="Buscar hoteles..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <datalist id="suggestions">
            {hotels.map((h) => (
              <option key={h.id} value={h.name} />
            ))}
          </datalist>

          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>Buscar</button>
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

      <section className="categories-filter">
        <h2>Filtrar por categoría</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategories.includes(category.id) ? 'active' : ''}`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selectedCategories.length > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Quitar filtros
          </button>
        )}

        <h2>
          Resultados ({filteredHotels.length} de {hotels.length})
        </h2>
      </section>


      <section className="recommendations">
        <div className="recommendations-header">
          {user && (
            <Link to="/mis-reservas" className="reservations-link">
              Mis Reservas
            </Link>
          )}
          <h2>Recomendaciones</h2>
          {user && (
            <Link to="/favorites" className="favorites-link">
              Mis Favoritos
            </Link>
          )}
        </div>

        <div className="recommendations-grid">
          {filteredHotels.map(hotel => (
            <div className="recommendation-card" key={hotel.id}>
              <div className="favorite-btn" onClick={() => handleFavorite(hotel.id)}>
                {favorites.includes(hotel.id)
                  ? <FaHeart color="#e63946" size={22} />
                  : <FaRegHeart color="#555" size={22} />}
              </div>

              {/* Imagen a la izquierda */}
              <img src={hotel.images[0]} alt={hotel.name} />

              {/* Info a la derecha */}
              <div className="hotel-info">
                <Link to={`/hotel/${hotel.id}`} className="recommendation-link">
                  <h3>{hotel.name}</h3>
                  <p><FaMapMarkerAlt color="#683b1f" /> {hotel.location}</p>
                  <p>{Array.from({ length: hotel.stars }).map((_, i) => (
                    <FaStar key={i} color="gold" />
                  ))}</p>
                  <p>${hotel.pricePerNight} / noche</p>
                </Link>
              </div>
            </div>
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


            <WhatsAppButton/>
    </main>
  )
}




