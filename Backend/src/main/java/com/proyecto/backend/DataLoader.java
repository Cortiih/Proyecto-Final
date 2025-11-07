package com.proyecto.backend;

import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DataLoader {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail("admin@app.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setLastName("Principal");
            admin.setEmail("admin@app.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setAdmin(true);

            userRepository.save(admin);

            System.out.println("Usuario admin creado:");
            System.out.println("Email: admin@app.com");
            System.out.println("Contraseña: admin123");
        } else {
            System.out.println("Usuario admin ya existe, no se crea uno nuevo.");
        }
    }
}
