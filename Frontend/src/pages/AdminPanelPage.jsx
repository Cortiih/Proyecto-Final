
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPanelPage.css";

export const AdminPanelPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="admin-not-available">
        <h2>Panel de administración no disponible en dispositivos móviles</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <nav className="admin-menu">
        <ul>
          <li><Link to="/admin/add-product">Agregar Producto</Link></li>
          <li><Link to="/admin/hotel-list">Lista de Productos</Link></li>
          <li><Link to="/admin/reservas">Gestionar Reservas</Link></li>
          <li><Link to="/admin/reportes">Ver Reportes</Link></li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

