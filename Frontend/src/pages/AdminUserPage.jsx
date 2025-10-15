import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUserPage.css";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}/make-admin`);
      fetchUsers(); // refresca la lista
    } catch (err) {
      console.error(err);
    }
  };

  const removeAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}/remove-admin`);
      fetchUsers(); // refresca la lista
    } catch (err) {
      console.error(err);
    }
  };

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
