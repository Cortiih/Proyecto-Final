import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import "./HotelDetail.css"
import { FaArrowLeft } from 'react-icons/fa';

export const HotelDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/hotels/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(err => console.log(err));
    }, [id])

    if (!hotel) return <p>Cargando...</p>;


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

            <p className="product-description">{hotel.description || "Descripción no disponible."}</p>
            <p>Ubicación: {hotel.location || "Ubicación no disponible"}</p>
            <p>Estrellas: {hotel.stars}</p>
            <p>Precio por noche: ${hotel.pricePerNight || "No disponible"}</p>
            <p>Categoría: {hotel.category || "Sin categoría"}</p>

        </div>
    )
}
