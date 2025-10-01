package com.proyecto.backend.service;

import com.proyecto.backend.model.Reserva;
import com.proyecto.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public ResponseEntity<?> save(Reserva reserva) {
        Reserva saved = reservaRepository.save(reserva);
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
}
