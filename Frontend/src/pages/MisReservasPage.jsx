import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import "./MisReservasPage.css";

export const MisReservasPage = () => {
  
    const { user, getToken } = useAuth();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:8080/api/reservas/user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setReservas(data);
                setLoading(false);
            })
            .catch(err => console.error("Error cargando reservas:", err))
    }, [user]);
    if (!user) return <p>Debes iniciar sesión para ver tus reservas.</p>;
    if (loading) return <p>Cargando reservas…</p>;

    return (
        <div className="mis-reservas-page">
            <h1>Mis Reservas</h1>

            {reservas.length === 0 ? (
                <p>No tienes reservas todavía.</p>
            ):(
                <ul className="lista-reservas">
                    {reservas.map(r => (
                        <li key={r.id} className="reserva-item">
                            <h3>{r.hotel?.name}</h3>
                            <p><strong>Inicio:</strong> {r.startDate}</p>
                            <p><strong>Fin:</strong> {r.endDate}</p>
                            <p><strong>Hotel ID:</strong> {r.hotel?.id}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

