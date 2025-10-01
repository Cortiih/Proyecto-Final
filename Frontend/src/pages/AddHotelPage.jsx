import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddHotelPage.css"
import axios from 'axios';

export const AddHotelPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerNight, setPricePerNight] = useState("");
    const [stars, setStars] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([""]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error cargando categorías:", err));
    }, [])

    const handleAddImage = () => setImages([...images, ""]);

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/hotels/add", {
                name,
                description,
                location,
                pricePerNight: parseFloat(pricePerNight),
                stars: parseInt(stars),
                category: { id: categoryId },
                images
            });
            alert("Producto agregado correctamente!");
            navigate("/");

        } catch (error) {
            setError(error.response?.data || "Error al guardar el producto");
        }
    }

    return (
        <div className='add-product'>
            <div className='container'>
                <h1>Agregar Producto</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    
                    <input 
                        type="text" 
                        placeholder='Nombre' 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />

                    <textarea 
                        placeholder='Descripción' 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        required 
                    />

                    <input 
                        type="text" 
                        placeholder='Ubicación' 
                        value={location} 
                        onChange={e => setLocation(e.target.value)} 
                        required 
                    />

                    <input 
                        type="number" 
                        placeholder='Precio por noche' 
                        value={pricePerNight} 
                        onChange={e => setPricePerNight(e.target.value)} 
                        required 
                    />

                    <input 
                        type="number" 
                        placeholder='Estrellas (1-5)' 
                        min="1" 
                        max="5"
                        value={stars} 
                        onChange={e => setStars(e.target.value)} 
                        required 
                    />

                    <select
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
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
