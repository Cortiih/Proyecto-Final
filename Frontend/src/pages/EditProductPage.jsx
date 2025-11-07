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

  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/hotels/${id}`);
        const product = res.data;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category ? product.category.id.toString() : '');
        setImages(product.images || []);
        setSelectedFeatures(product.features?.map(f => f.id) || []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/features")
      .then(res => setFeatures(res.data))
      .catch(err => console.error("Error al cargar características:", err));
  }, []);

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };


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
        category: { id: parseInt(category) },
        images,
        features: selectedFeatures.map(id => ({ id }))
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
            <option value="1">Hotel</option>
            <option value="2">Cabaña</option>
            <option value="3">Departamento</option>
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


          <h3>Características</h3>
          <div className="features-list">
            {features.map(f => (
              <label key={f.id} style={{ display: "block", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(f.id)}
                  onChange={() => handleFeatureChange(f.id)}
                />
                <i className={`fa ${f.icon}`} style={{ marginLeft: "8px" }}></i> {f.name}
              </label>
            ))}
          </div>

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};