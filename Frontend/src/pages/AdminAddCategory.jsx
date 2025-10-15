import React, { useState } from 'react'
import "./AdminAddCategory.css"


export const AdminAddCategory = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !imageUrl) {
            setErrorMessage("Todos los campos son obligatorios");
            setSuccessMessage("");
            return;
        }

        const newCategory = { name, description, imageUrl };

        fetch("http://localhost:8080/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al crear la categoría");
                return res.json();
            })
            .then(() => {
                setSuccessMessage("Categoría creada con éxito");
                setErrorMessage("");
                setName("");
                setDescription("");
                setImageUrl("");
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("Hubo un problema al guardar la categoría");
            });
    };

    return (
        <div className='add-category'>
            <div className="add-category-container">
                <h2>Agregar nueva categoría</h2>
                <form className="add-category-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            placeholder="Ej: Hotel"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea
                            placeholder="Descripción de la categoría"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Imagen (URL):</label>
                        <input
                            type="text"
                            placeholder="https://example.com/imagen.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-guardar">Guardar categoría</button>

                    {successMessage && <p className="success">{successMessage}</p>}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}
