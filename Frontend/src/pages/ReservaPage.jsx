import React, { useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import "./ReservaPage.css";

export const ReservaPage = () => {
    const { id } = useParams();
    const { user, getToken } = useAuth();

    const [hotel, setHotel] = useState(null);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/hotels/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(err => console.error("Error al cargar hotel:", err));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/reservas/hotel/${id}`)
            .then(res => res.json())
            .then(data => setFechasOcupadas(data))
            .catch(err => console.error("Error al obtener reservas:", err));
    }, [id]);


    const verificarDisponibilidad = () => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (fin < inicio) return false;

        return !fechasOcupadas.some(r => {
            const resInicio = new Date(r.startDate);
            const resFin = new Date(r.endDate);
            return inicio <= resFin && resInicio <= fin;
        });
    }

    const handleReserva = async () => {
        if (!fechaInicio || !fechaFin) {
            setMensaje("Selecciona un rango de fechas.");
            return;
        }

        if (!user) {
            setMensaje("Debes iniciar sesión para reservar.");
            return;
        }

        if (!verificarDisponibilidad()) {
            setMensaje("El hotel ya está reservado en esas fechas.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    hotel: { id: Number(id) },
                    startDate: fechaInicio,
                    endDate: fechaFin,
                    user: { id: user.id },
                    nombreCliente: `${user.name} ${user.lastName}`
                }),
            });

            if (!res.ok) throw new Error("Error al realizar la reserva");
            await res.json();
            alert("¡Reserva realizada con éxito!");
            setFechasOcupadas(prev => [...prev, { startDate: fechaInicio, endDate: fechaFin }]);
            setFechaInicio("");
            setFechaFin("");
        } catch (err) {
            console.error(err);
            setMensaje("Error al realizar la reserva.");
        }
    }

    if (!hotel) {
        return <p>Cargando información del hotel...</p>;
    }


    return (
        <div className="reserva-page">
            <div className="reserva-container">
                <h1>Reserva: {hotel.name}</h1>

                <div className="reserva-hotel-info">
                    <p><strong>Ubicación:</strong> {hotel.location}</p>
                    <p><strong>Precio por noche:</strong> ${hotel.pricePerNight}</p>
                    <p><strong>Estrellas:</strong> {hotel.stars}</p>
                    <p><strong>Categoría:</strong> {hotel.category?.name || "Sin categoría"}</p>
                    <p><strong>Descripción:</strong> {hotel.description}</p>
                    {hotel.features && hotel.features.length > 0 && (
                        <p><strong>Características:</strong> {hotel.features.map(f => f.name).join(", ")}</p>
                    )}
                    {hotel.images && hotel.images.length > 0 && (
                        <div className="reserva-hotel-images">
                            {hotel.images.map((img, i) => (
                                <img key={i} src={img} alt={`${hotel.name} ${i}`} className="small-img" />
                            ))}
                        </div>
                    )}
                </div>

                
                {user && (
                    <div className="user-infor">
                        <h3>Datos del usuario</h3>
                        <p><strong>Nombre:</strong> {user.name} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                )}

                <div className="date-inputs">
                    <label>Fecha de inicio</label>
                    <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />

                    <label>Fecha de fin</label>
                    <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
                </div>

                <button className="confirm-reserva-btn" onClick={handleReserva}>
                    Confirmar Reserva
                </button>

                {mensaje && <p className="reserva-msg">{mensaje}</p>}

                {fechasOcupadas.length > 0 && (
                    <div className="ocupadas">
                        <h3>Fechas ocupadas</h3>
                        {fechasOcupadas.map((r, i) => (
                            <p key={i}>
                                {r.startDate} → {r.endDate}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

