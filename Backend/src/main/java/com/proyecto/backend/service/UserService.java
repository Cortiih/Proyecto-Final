package com.proyecto.backend.service;

import com.proyecto.backend.config.JwtUtil;
import com.proyecto.backend.dto.UserDTO;
import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.model.User;
import com.proyecto.backend.repository.HotelRepository;
import com.proyecto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserDTO register(User user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (user.getLastName() == null || user.getLastName().isEmpty()) {
            throw new RuntimeException("El apellido es obligatorio");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new RuntimeException("El email es obligatorio");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con ese email");
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new RuntimeException("La contraseña debe tener al menos 6 caracteres");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return new UserDTO(saved);
    }


    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    // login
    public UserDTO login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .filter(u -> passwordEncoder.matches(password, u.getPassword()))
                .orElseThrow(() -> new RuntimeException("Email o contraseña incorrectos"));

        return new UserDTO(user);
    }

    //dar permisos
    public UserDTO makeAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setAdmin(true);
        return new UserDTO(userRepository.save(user));
    }


    //sacar permisos
    public UserDTO removeAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setAdmin(false);
        return new UserDTO(userRepository.save(user));
    }


    public void toggleFavorite(Long userId, Long hotelId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));

        if (user.getFavorites().contains(hotel)) {
            user.getFavorites().remove(hotel);
        } else {
            user.getFavorites().add(hotel);
        }

        userRepository.save(user);
    }

    public Set<Hotel> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        return user.getFavorites();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
}


