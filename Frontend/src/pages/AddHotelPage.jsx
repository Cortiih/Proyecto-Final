import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddHotelPage.css"
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

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

    const [features, setFeatures] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const { getToken } = useAuth();


    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error cargando categorías:", err));

        axios.get("http://localhost:8080/api/features")
            .then(res => setFeatures(res.data))
            .catch(err => console.error("Error cargando características:", err));
    }, [])

    const handleAddImage = () => setImages([...images, ""]);

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    }

    const handleFeatureChange = (id) => {
        if (selectedFeatures.includes(id)) {
            // Si ya estaba, la sacamoss
            setSelectedFeatures(selectedFeatures.filter(f => f !== id));
        } else {
            // Si no estaba, la agregamos
            setSelectedFeatures([...selectedFeatures, id]);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    try {
        const res = await axios.post(
            "http://localhost:8080/api/hotels/add",
            {
                name,
                description,
                location,
                pricePerNight: parseFloat(pricePerNight),
                stars: parseInt(stars),
                category: { id: categoryId },
                images,
                features: selectedFeatures.map(id => ({ id }))
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        alert("Producto agregado correctamente!");
        navigate("/admin/hotel-list");

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


                    <div className="features-section">
                        <h3>Características</h3>
                        <div className="features-list">
                            {features.map(f => (
                                <label key={f.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedFeatures.includes(f.id)}
                                        onChange={() => handleFeatureChange(f.id)}
                                    />
                                    <i className={`fa ${f.icon}`}></i> {f.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit">Guardar Producto</button>
                </form>
            </div>
        </div>
    )
}
