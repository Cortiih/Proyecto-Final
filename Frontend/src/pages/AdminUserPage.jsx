import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUserPage.css";
import { useAuth } from "../context/AuthProvider";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const { user, login } = useAuth();

  const axiosConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  }

  const fetchUsers = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:8080/api/users", axiosConfig);
      setUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const makeAdmin = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${id}/make-admin`,{},axiosConfig
      );
      fetchUsers();
      if (user && user.id === id) {
        login(res.data);
      }
    } catch (err) {
      console.error("Error al hacer admin:", err.response?.data || err.message);
    }
  };


 const removeAdmin = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${id}/remove-admin`, {}, axiosConfig
      );
      fetchUsers();
      if (user && user.id === id) {
        login(res.data);
      }
    } catch (err) {
      console.error("Error al quitar admin:", err.response?.data || err.message);
    }
  }

  if (!user || !user.admin) {
    return <p>No tienes permisos para ver esta página.</p>;
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-card">
        <h2>Usuarios Registrados</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "Sí" : "No"}</td>
                <td>
                  {!user.admin ? (
                    <button className="action-btn-make" onClick={() => makeAdmin(user.id)}>Hacer Admin</button>
                  ) : (
                    <button className="action-btn-remove" onClick={() => removeAdmin(user.id)}>Quitar Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
