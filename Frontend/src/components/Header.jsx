import React from "react"
import "./Header.css"
import { useLocation } from "react-router-dom"


export const Header = () => {

    const location = useLocation();

    // Si estoy en /product/:id => oculto este header
    if (location.pathname.startsWith("/product/")) {
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
                <button className="btn" type="button">Crear Cuenta</button>
                <button className="btn" type="button">Iniciar Sesion</button>
            </div>
        </header>
    )
}