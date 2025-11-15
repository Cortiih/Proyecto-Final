import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import "./HotelDetail.css"
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { FaWifi, FaCar, FaSnowflake } from 'react-icons/fa';
import { HotelPolicies } from '../components/HotelPolicies';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { HotelRating } from './HotelRating';


export const HotelDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState(null);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareMessage, setShareMessage] = useState("");

    const iconMap = {
        "fa-wifi": <FaWifi />,
        "fa-car": <FaCar />,
        "fa-snowflake": <FaSnowflake />,

    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/hotels/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(() => setError("No se pudo cargar la información del hotel."));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/reservas/hotel/${id}`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => setReservas(data))
            .catch(() => setError("No se pudo obtener la disponibilidad."));
    }, [id]);

    if (error) {
        return (
            <div className="error-box">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
        );
    }

    if (!hotel) return <p>Cargando...</p>;


    const estaOcupada = (fecha) => {
        const f = new Date(fecha);
        return reservas.some(r => {
            const inicio = new Date(r.startDate);
            const fin = new Date(r.endDate);
            return f >= inicio && f <= fin;
        });
    };


    return (
        <div className='product-detail'>

            <header className='product-header'>
                <h1>{hotel.name}</h1>
                <button onClick={() => navigate(-1)} className="back-btn"><FaArrowLeft size={20} /> Volver</button>
            </header>

            <div className="gallery">
                {hotel.images && hotel.images.length > 0 && (
                    <>
                        <div className="main-image">
                            <img src={hotel.images[0]} alt={hotel.name} />
                            <div className="share-btn-overlay" onClick={() => setIsShareOpen(true)}>
                                <FaShareAlt size={20} />
                            </div>
                        </div>

                        <div className="side-images">
                            {hotel.images.slice(1, 5).map((img, i) => (
                                <img key={i} src={img} alt={`${hotel.name} ${i}`} />
                            ))}

                            <button className="see-more" onClick={() => {
                                setIsModalOpen(true);
                                setSelectedIndex(0);
                            }} >Ver más</button>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-btn"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>

                        <img
                            src={hotel.images[selectedIndex]}
                            alt={`${hotel.name} imagen ${selectedIndex + 1}`}
                            className="modal-image"
                        />

                        <div className="modal-controls">
                            <button
                                onClick={() => setSelectedIndex(selectedIndex - 1)}
                                disabled={selectedIndex === 0}
                            >
                                ⬅
                            </button>

                            <button
                                onClick={() => setSelectedIndex(selectedIndex + 1)}
                                disabled={selectedIndex === hotel.images.length - 1}
                            >
                                ➡
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isShareOpen && (
                <div className="modal-overlay">
                    <div className="modal-content share-modal">
                        <button className="close-btn" onClick={() => setIsShareOpen(false)}>✖</button>
                        <h3>Compartir {hotel.name}</h3>
                        <img src={hotel.images[0]} alt={hotel.name} className="share-image" />
                        <p className="share-description">
                            {hotel.description
                                ? hotel.description.length > 100
                                    ? hotel.description.substring(0, 100) + "..."
                                    : hotel.description
                                : "No hay descripcion disponible."}
                        </p>
                        <textarea
                            placeholder="Agrega un mensaje personalizado..."
                            value={shareMessage}
                            onChange={(e) => setShareMessage(e.target.value)}
                            rows={3}
                        />
                        <div className="share-buttons">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`}
                                target="_blank" rel="noopener noreferrer"
                            ><FaFacebook size={25} /> Facebook</a>

                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareMessage)}`}
                                target="_blank" rel="noopener noreferrer"
                            ><FaTwitter size={25} /> Twitter</a>

                            <a
                                href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                                target="_blank" rel="noopener noreferrer"
                            ><FaInstagram size={25} /> Instagram</a>
                        </div>
                    </div>
                </div>
            )}


            <p className="product-description">{hotel.description || "Descripción no disponible."}</p>
            <p>Ubicación: {hotel.location || "Ubicación no disponible"}</p>
            <p>Estrellas: {hotel.stars}</p>
            <p>Precio por noche: ${hotel.pricePerNight || "No disponible"}</p>
            <p>Categoría: {hotel.category?.name || "Sin categoría"}</p>


            <div className="features-block">
                <h2>Características</h2>
                <div className="features-list">
                    {hotel.features && hotel.features.length > 0 ? (
                        hotel.features.map((feature) => (
                            <div key={feature.id} className="feature-item">
                                {iconMap[feature.icon] || <FaWifi />}
                                <span>{feature.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>Este hotel no tiene características registradas.</p>
                    )}
                </div>
            </div>

            <div className="availability-block">
                <h2>Disponibilidad</h2>
                <p>Seleccione un rango de fechas:</p>

                <div className="date-inputs">
                    <label>Fecha de inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

                    <label>Fecha de fin:</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                </div>

                {fechaInicio && fechaFin && (
                    <div className="availability-result">
                        {estaOcupada(fechaInicio) || estaOcupada(fechaFin)
                            ? <p className="unavailable">Algunas fechas no están disponibles</p>
                            : <p className="available">Fechas disponibles</p>}
                    </div>
                )}


                <div className="occupied-list">
                    <h4>Fechas ocupadas:</h4>
                    {reservas.length > 0 ? (
                        reservas.map((r, i) => (
                            <p key={i}>
                                Del <strong>{r.startDate}</strong> al <strong>{r.endDate}</strong>
                            </p>
                        ))
                    ) : (
                        <p>No hay reservas en este momento.</p>
                    )}
                </div>
            </div>

            <HotelPolicies />

            <HotelRating hotelId={hotel.id} />

        </div>
    )
}
