package com.proyecto.backend.service;

import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> register(User user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre es obligatorio");
        }
        if (user.getLastName() == null || user.getLastName().isEmpty()) {
            return ResponseEntity.badRequest().body("El apellido es obligatorio");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("El email es obligatorio");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Ya existe un usuario con ese email");
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("La contraseña debe tener al menos 6 caracteres");
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}

