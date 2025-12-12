import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./whatsAppButton.css";

const WhatsAppButton = ({
    phone = "5491122334455",
    message = "Hola! Tengo una consulta sobre el producto"
}) => {

    const handleWhatsApp = () => {
        try {
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");

            alert("El mensaje fue enviado correctamente");
        } catch (error) {
            console.error("Error abriendo WhatsApp:", error);
            alert("Hubo un problema al intentar abrir WhatsApp. Verifica tu conexión.");
        }
    }

    return (
        <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <FaWhatsapp className="whatsapp-icon" />
        </button>
    )
}

export default WhatsAppButton;
