import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddProductPage.css"

export const AddProductPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Hotel");
    const [images, setImages] = useState([""]);
    const [error, setError] = useState("");

    const handleAddImage = () => setImages([...images, ""]);

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/hotels/save", {
                name, description, category, images
            });
            alert("Producto agregado correctamente!");
            navigate("/");

        } catch (error) {
            setError(error.response.data);
        }
    }


    return (
        <div className='add-product'>
            <div className='container'>
                <h1>Agregar Producto</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Nombre' value={name} onChange={e => setName(e.target.value)} required />
                    <textarea placeholder='Descripcion' value={description} onChange={e => setDescription(e.target.value)} required />
                    <select value={category} onChange={e => setCategory(e.target.value)}>

                        <option>Hotel</option>
                        <option>Cabaña</option>
                        <option>Departamento</option>

                    </select>

                    {images.map((img, i) => (
                        <input
                            key={i}
                            placeholder="URL de imagen"
                            value={img}
                            onChange={e => handleImageChange(i, e.target.value)}
                        />
                    ))}
                    <button type="button" onClick={handleAddImage}>Agregar otra imagen</button>
                    <button type="submit">Guardar Producto</button>
                </form>
            </div>
        </div>
    )
}
