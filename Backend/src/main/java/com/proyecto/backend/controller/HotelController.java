package com.proyecto.backend.controller;

import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    // Crear hotel
    @PostMapping("/add")
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }

    // Listar todos
    @GetMapping
    public Page<Hotel> findAll(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return hotelService.findAll(pageable);
    }

    // Buscar por id
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return hotelService.findByIdResponse(id);
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<?> getByCategory(@PathVariable String categoryName) {
        return hotelService.findByCategoryName(categoryName);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Hotel hotel) {
        return hotelService.update(id, hotel);
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return hotelService.delete(id);
    }
}


