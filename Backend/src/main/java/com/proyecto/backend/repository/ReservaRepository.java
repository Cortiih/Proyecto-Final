package com.proyecto.backend.repository;

import com.proyecto.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByHotelId(Long hotelId);
    List<Reserva> findByUserId(Long userId);
}

