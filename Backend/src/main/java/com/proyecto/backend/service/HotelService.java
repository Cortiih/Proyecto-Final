package com.proyecto.backend.service;

import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    @Autowired
    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    // Crear hotel
    public ResponseEntity<?> saveHotel(Hotel hotel) {
        if (hotelRepository.findByName(hotel.getName()).isPresent()) {
            return ResponseEntity.badRequest().body("El nombre del hotel ya está en uso");
        }
        if (hotel.getDescription() == null) {
            hotel.setDescription("");
        }

        Hotel saved = hotelRepository.save(hotel);
        return ResponseEntity.ok(saved);
    }

    // Listar
    public Page<Hotel> findAll(Pageable pageable) {
        return hotelRepository.findAll(pageable);
    }

    // Buscar por id
    public ResponseEntity<?> findByIdResponse(Long id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);
        return hotel.isPresent()
                ? ResponseEntity.ok(hotel.get())
                : ResponseEntity.notFound().build();
    }

    // Actualizar
    public ResponseEntity<?> update(Long id, Hotel hotel) {
        if (!hotelRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        hotel.setId(id);
        Hotel updated = hotelRepository.save(hotel);
        return ResponseEntity.ok(updated);
    }

    // Eliminar
    public ResponseEntity<?> delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        hotelRepository.deleteById(id);
        return ResponseEntity.ok("Hotel eliminado con éxito");
    }
}
