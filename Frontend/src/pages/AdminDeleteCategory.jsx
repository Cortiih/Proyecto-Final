import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import "./AdminDeleteCategory.css"

export const AdminDeleteCategory = () => {

    const [categories, setCategories] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch("http://localhost:8080/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(console.error);
    }, []);

    const handleDelete = async (category) => {
        const confirmDelete = window.confirm(
            `¿Estás seguro de eliminar la categoría "${category.name}"?\n` +
            `Todos los productos asociados podrían verse afectados.`
        );
        if (!confirmDelete) return;

        try {
            const token = user.token;
            const res = await fetch(`http://localhost:8080/api/categories/${category.id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("No se pudo eliminar la categoría");

            setCategories(categories.filter(c => c.id !== category.id));
            alert("Categoría eliminada correctamente");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="admin-categories">
            <h2>Administrar Categorías</h2>
            {categories.length === 0 ? (
                <p>No hay categorías registradas</p>
            ) : (
                <ul>
                    {categories.map(cat => (
                        <li key={cat.id}>
                            {cat.name}
                            <button onClick={() => handleDelete(cat)} className="delete-btn">
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
