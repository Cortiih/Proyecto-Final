import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


export const ProtectedRoute = ({ adminRequired }) => {
  const { user } = useAuth();

  // no logueado → login
  if (!user) return <Navigate to="/login" replace />;

  // si no se requiere ser admin, cualquiera logueado puede pasar
  if (!adminRequired) return <Outlet />;

  // si se requiere admin, comprobamos la propiedad user.admin
  if (!user.admin) return <Navigate to="/" replace />;

  return <Outlet />;
}