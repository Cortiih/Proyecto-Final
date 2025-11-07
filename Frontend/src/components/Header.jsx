import React from "react"
import "./Header.css"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider";


export const Header = () => {

    const { user, logout } = useAuth();
    const location = useLocation();

    // Si estoy en /product/:id => oculto este header
    if (location.pathname.startsWith("/hotel/")) {
        return null;
    }

    return (
        <header className="header">
            <div
                className="logo-section"
                onClick={() => (window.location.href = "/")}
                style={{ cursor: "pointer" }}
            >
                <img src="logo.png" alt="Logo de la empresa" className="logo" />
                <span className="lema">El destino perfecto, para vos</span>
            </div>

            <div className="buttons">
                {!user ? (
                    // Si no hay usuario
                    <>
                        <Link to="/register">
                            <button className="btn" type="button">Crear Cuenta</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn" type="button">Iniciar Sesion</button>
                        </Link>
                    </>
                ) : (
                    // Si hay usuario logueado
                    <div className="user-info">
                        <div className="avatar-name">
                            <div className="avatar">{user.name[0].toUpperCase()}</div>
                            <span>{user.name}</span>
                        </div>


                        {user.admin && (
                            <Link to="/admin">
                                <button className="btn admin-btn" type="button">
                                    Panel Admin
                                </button>
                            </Link>
                        )}

                        <button onClick={logout} className="btn">Cerrar Sesión</button>
                    </div>
                )}
            </div>

        </header>
    )
}