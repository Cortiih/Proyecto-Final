package com.proyecto.backend.controller;

import com.proyecto.backend.config.JwtUtil;
import com.proyecto.backend.dto.LoginRequest;
import com.proyecto.backend.dto.UserDTO;
import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.model.User;
import com.proyecto.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {
        UserDTO userDTO = userService.register(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        try {
            UserDTO userDTO = userService.login(request.getEmail(), request.getPassword());

            String role = userDTO.isAdmin() ? "ADMIN" : "USER";
            String token = jwtUtil.generarToken(userDTO.getEmail(), role);

            userDTO.setToken(token);
            return ResponseEntity.ok(userDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }


    //hacer administrador
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/make-admin")
    public ResponseEntity<UserDTO> makeAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(userService.makeAdmin(id));
    }

    //sacar administrador
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/remove-admin")
    public ResponseEntity<UserDTO> removeAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(userService.removeAdmin(id));
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/{userId}/favorites/{hotelId}")
    public ResponseEntity<String> toggleFavorite(@PathVariable Long userId, @PathVariable Long hotelId) {
        userService.toggleFavorite(userId, hotelId);
        return ResponseEntity.ok("Favorito actualizado correctamente");
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<Set<Hotel>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getFavorites(userId));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/{userId}/favorites/{hotelId}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long userId, @PathVariable Long hotelId) {
        userService.removeFavorite(userId, hotelId);
        return ResponseEntity.ok("Favorito eliminado correctamente");
    }
}
