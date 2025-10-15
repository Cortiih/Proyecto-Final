package com.proyecto.backend.service;

import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // login
    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Email o contraseña incorrectos"));
    }

    //dar permisos
    public User makeAdmin(Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        User user = userOpt.get();
        user.setAdmin(true);
        return userRepository.save(user);
    }

    //sacar permisos
    public User removeAdmin(Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        User user = userOpt.get();
        user.setAdmin(false);
        return userRepository.save(user);
    }
}

