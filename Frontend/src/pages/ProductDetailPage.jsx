import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import "./ProductDetail.css"
import { FaArrowLeft } from 'react-icons/fa';

export const ProductDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/hotels/${id}`)
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

            <p className="product-description">{hotel.description || "Descripción no disponible."}</p>

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

                    <button className="see-more" >Ver más</button>
                </div>
                </>
                 )}
            </div>

        </div>
    )
}
