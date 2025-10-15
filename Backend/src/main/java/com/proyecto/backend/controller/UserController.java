package com.proyecto.backend.controller;

import com.proyecto.backend.model.User;
import com.proyecto.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.register(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User logged = userService.login(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(logged);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    //hacer administrador
    @PutMapping("/{id}/make-admin")
    public ResponseEntity<User> makeAdmin(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.makeAdmin(id));
    }

    //sacar administrador
    @PutMapping("/{id}/remove-admin")
    public ResponseEntity<User> removeAdmin(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.removeAdmin(id));
    }
}
