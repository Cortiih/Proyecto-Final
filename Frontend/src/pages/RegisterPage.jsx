import React, { useState } from "react";
import "./RegisterPage.css";

export const RegisterPage = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validaciones
        if (!name || !lastName || !email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (!email.includes("@")) {
            setError("El correo electrónico no es válido");
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setError("");

        //Enviar datos al backend
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
            } else {
                setError("Error en el registro. Intenta nuevamente");
            }
        } catch (err) {
            console.error(err);
            setError("Error en el servidor");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Registro de Usuario</h2>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="register-btn" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};
