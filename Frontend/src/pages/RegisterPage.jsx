import React, { useState } from "react";
import "./RegisterPage.css";

export const RegisterPage = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "El nombre es obligatorio";
    if (!lastName) newErrors.lastName = "El apellido es obligatorio";
    if (!email) newErrors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Correo inválido";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, lastName, email, password }),
            });

            if (res.ok) {
                setSuccess("Usuario registrado con éxito");
                setName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setErrors({});
            } else {
                setErrors("Error en el registro. Intenta nuevamente");
            }
        } catch (err) {
            console.error(err);
            setErrors("Error en el servidor");
        }
    }

    return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registro de Usuario</h2>
        {errors.general && <p className="error-msg">{errors.general}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}

          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error-msg">{errors.lastName}</p>}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}

          <button className="register-btn" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}
