package com.proyecto.backend.controller;

import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.model.Rating;
import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.HotelRepository;
import com.proyecto.backend.repository.UserRepository;
import com.proyecto.backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:5173")
public class RatingController {

    private final RatingService ratingService;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    @Autowired
    public RatingController(RatingService ratingService, HotelRepository hotelRepository, UserRepository userRepository) {
        this.ratingService = ratingService;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("/hotel/{hotelId}")
    public List<Rating> getRatingsByHotel(@PathVariable Long hotelId) {
        return ratingService.getRatingsByHotel(hotelId);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/hotel/{hotelId}/user/{userId}")
    public ResponseEntity<?> createRatingForHotelAndUser(
            @PathVariable Long hotelId,
            @PathVariable Long userId,
            @RequestBody Rating rating,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Debe estar autenticado para dejar una reseña");
        }


        String authEmail = authentication.getName();
        User authUser = userRepository.findByEmail(authEmail)
                .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));

        boolean isAdmin = authUser.isAdmin();
        if (!authUser.getId().equals(userId) && !isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No tiene permiso para dejar reseñas en nombre de otro usuario");
        }

        //Buscar hotel y usuario
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        rating.setHotel(hotel);
        rating.setUser(user);
        rating.setCreatedAt(LocalDateTime.now());

        Rating saved = ratingService.saveRating(rating);
        return ResponseEntity.ok(saved);
    }
}
