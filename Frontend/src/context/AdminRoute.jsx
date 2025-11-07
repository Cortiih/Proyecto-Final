import React from 'react'
import { useAuth } from './AuthProvider';
import { Navigate } from "react-router-dom";

export const AdminRoute = () => {

    const { user } = useAuth();
  
  if (!user || !user.admin) {
    return <Navigate to="/" />; // redirige si no es admin
  }

  return children;
}
