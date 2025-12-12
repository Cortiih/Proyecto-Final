package com.proyecto.backend.service;

import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.model.Reserva;
import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.HotelRepository;
import com.proyecto.backend.repository.ReservaRepository;
import com.proyecto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;


    @Autowired
    public ReservaService(ReservaRepository reservaRepository, EmailService emailService, UserRepository userRepository, HotelRepository hotelRepository) {
        this.reservaRepository = reservaRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
    }

    public ResponseEntity<?> save(Reserva reserva) {
        Reserva saved = reservaRepository.save(reserva);

        try {
            // 2) Buscar el usuario en la base de datos
            User userCompleto = userRepository.findById(saved.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String emailUsuario = userCompleto.getEmail();

            //Cargar hotel completo
            Hotel hotelCompleto = hotelRepository.findById(saved.getHotel().getId())
                    .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));

            saved.setHotel(hotelCompleto);

            // 3) Crear mensaje HTML con estilo
            String htmlMensaje = """
             <html>
                    <head>
                        <style>
                            body {
                                background-color: beige;
                                padding: 40px 0;
                                font-family: Arial, sans-serif;
                                display: flex;
                                justify-content: center;
                            }
                    
                            .reserva-container {
                                width: 500px;
                                background: white;
                                border-radius: 12px;
                                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                                padding: 30px;
                                margin: auto;
                            }
                    
                            h1 {
                                color: #683b1f;
                                text-align: center;
                                margin-bottom: 25px;
                            }
                    
                            .reserva-hotel-info {
                                background: #fff7e6;
                                padding: 15px;
                                border-radius: 10px;
                                border: 1px solid #e8c9a1;
                                margin-bottom: 25px;
                            }
                    
                            .reserva-hotel-info p {
                                margin: 6px 0;
                                color: #5a3a1a;
                            }
                    
                            .user-info {
                                background: #eef5ff;
                                padding: 15px;
                                border-left: 4px solid #5a3a1a;
                                border-radius: 8px;
                                margin-bottom: 25px;
                            }
                    
                            .user-info p {
                                margin: 5px 0;
                                color: #5a3a1a;
                            }
                    
                            strong {
                                color: #683b1f;
                            }
                    
                            .footer {
                                text-align: center;
                                margin-top: 25px;
                                color: #5a3a1a;
                                font-size: 14px;
                            }
                        </style>
                    </head>
                    
                    <body>
                        <div class="reserva-container">
                            <h1>¡Reserva confirmada, %s!</h1>
                    
                            <div class="reserva-hotel-info">
                                <p><strong>Hotel:</strong> %s</p>
                                <p><strong>Hora de la reserva:</strong> %s</p>
                                <p><strong>Fecha de inicio:</strong> %s</p>
                                <p><strong>Fecha de fin:</strong> %s</p>
                            </div>
                    
                            <div class="user-info">
                                <p><strong>Usuario:</strong> %s</p>
                                <p><strong>Email:</strong> %s</p>
                            </div>
                    
                            <div class="footer">
                                Gracias por usar nuestra plataforma.
                            </div>
                        </div>
                    </body>
                    </html>
                    """.formatted(
                    saved.getNombreCliente(),
                    hotelCompleto.getName(),
                    LocalDateTime.now().withNano(0).toString(),
                    saved.getStartDate(),
                    saved.getEndDate(),
                    userCompleto.getName(),
                    userCompleto.getEmail()
            );

            // 4) Enviar email
            emailService.enviarEmailReserva(
                    emailUsuario,
                    "Confirmación de Reserva",
                    htmlMensaje
            );

        } catch (Exception e) {
            System.out.println("Error enviando correo de reserva: " + e.getMessage());
        }
        return ResponseEntity.ok(saved);
    }

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public ResponseEntity<?> findByIdResponse(Long id) {
        return reservaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> delete(Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.ok("Reserva eliminada con éxito");
    }

    public List<Reserva> obtenerReservasPorHotel(Long hotelId) {
        return reservaRepository.findByHotelId(hotelId);
    }

    public List<Reserva> obtenerReservasPorUsuario(Long userId) {
        return reservaRepository.findByUserId(userId);
    }
}
