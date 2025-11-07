import React from "react";
import "./HotelPolicies.css";

export const HotelPolicies = () => {
  const policies = [
    {
      title: "Normas del lugar",
      description: "No se permiten fiestas, fumar dentro del alojamiento.",
    },
    {
      title: "Política de cancelación",
      description: "Cancelación gratuita hasta 7 días antes del check-in. Luego no reembolsable.",
    },
    {
      title: "Seguridad e higiene",
      description: "El alojamiento sigue protocolos de limpieza y desinfección después de cada estancia.",
    },
  ]

  return (
    <section className="policies-container">
      <h2 className="policies-title">Políticas del alojamiento</h2>
      <div className="policies-grid">
        {policies.map((policy, index) => (
          <div key={index} className="policy-item">
            <h3>{policy.title}</h3>
            <p>{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
