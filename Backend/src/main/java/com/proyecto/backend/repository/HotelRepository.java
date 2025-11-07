package com.proyecto.backend.repository;

import com.proyecto.backend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    Optional<Hotel> findByName(String name);

    List<Hotel> findByCategory_Name(String name);

    List<Hotel> findByCategory_Id(Long categoryId);

}
