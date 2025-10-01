import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./AddHotelPage.css";

export const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/hotels/${id}`);
        const product = res.data;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setImages(product.images || []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddImage = () => setImages([...images, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/hotels/${id}`, {
        name,
        description,
        category,
        images
      });

      alert("Producto actualizado correctamente!");
      navigate("/admin/hotel-list");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el producto.");
    }
  };

  return (
    <div className="edit-product">
      <div className="container">
        <h1>Editar Producto</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <label>Categoría</label>
          <select value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="Hotel">Hotel</option>
            <option value="Cabaña">Cabaña</option>
            <option value="Departamento">Departamento</option>
          </select>

          <label>Imágenes</label>
          {images.map((img, i) => (
            <input
              key={i}
              placeholder="URL de imagen"
              value={img}
              onChange={e => handleImageChange(i, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddImage}>Agregar otra imagen</button>

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};