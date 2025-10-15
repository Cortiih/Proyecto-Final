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

    // Actualizar hotel existente
    public ResponseEntity<?> update(Long id, Hotel hotelDetails) {
        Optional<Hotel> optionalHotel = hotelRepository.findById(id);

        if (optionalHotel.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Hotel existingHotel = optionalHotel.get();

        existingHotel.setName(hotelDetails.getName());
        existingHotel.setDescription(hotelDetails.getDescription());
        existingHotel.setImages(hotelDetails.getImages());

        //Actualizar category
        if (hotelDetails.getCategory() != null && hotelDetails.getCategory().getId() != null) {
            existingHotel.setCategory(hotelDetails.getCategory());
        }
        //Actualizar features
        if (hotelDetails.getFeatures() != null) {
            existingHotel.setFeatures(hotelDetails.getFeatures());
        }

        Hotel updatedHotel = hotelRepository.save(existingHotel);
        return ResponseEntity.ok(updatedHotel);
    }

    // Eliminar
    public ResponseEntity<?> delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        hotelRepository.deleteById(id);
        return ResponseEntity.ok("Hotel eliminado con éxito");
    }

    public ResponseEntity<?> findByCategoryName(String categoryName) {
        var hotels = hotelRepository.findByCategory_Name(categoryName);
        return ResponseEntity.ok(hotels);}
}
