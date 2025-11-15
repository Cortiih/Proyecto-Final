import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFeaturesPage.css";
import { useAuth } from "../context/AuthProvider";

export const AdminFeaturesPage = () => {
    const [features, setFeatures] = useState([]);
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [editing, setEditing] = useState(null);
    const { getToken } = useAuth();

    const fetchFeatures = async () => {
        const res = await axios.get("http://localhost:8080/api/features");
        setFeatures(res.data);
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (editing) {
            await axios.put(`http://localhost:8080/api/features/${editing}`, { name, icon },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        } else {
            await axios.post("http://localhost:8080/api/features", { name, icon },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        }
        setName("");
        setIcon("");
        setEditing(null);
        fetchFeatures();
    };

    const handleDelete = async (id) => {
        const token = getToken();
        if (confirm("¿Eliminar característica?")) {
            await axios.delete(`http://localhost:8080/api/features/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            fetchFeatures();
        }
    };

    const handleEdit = (feature) => {
        setName(feature.name);
        setIcon(feature.icon);
        setEditing(feature.id);
    };

    return (
        <div className="features-admin">
            <div className="container">
                <h1>Administrar Características</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Icono"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        required
                    />
                    <button type="submit">{editing ? "Guardar cambios" : "Añadir Nueva"}</button>
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ícono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((f) => (
                        <tr key={f.id}>
                            <td>{f.id}</td>
                            <td>{f.name}</td>
                            <td><i className={`fa ${f.icon}`}></i> {f.icon}</td>
                            <td>
                                <button className="action-btn-edit" onClick={() => handleEdit(f)}>Editar</button>
                                <button className="action-btn-delete" onClick={() => handleDelete(f.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

