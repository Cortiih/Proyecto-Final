package com.proyecto.backend.service;

import com.proyecto.backend.model.Hotel;
import com.proyecto.backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;


    public Hotel saveHotel(Hotel hotel){
        return hotelRepository.save(hotel);
    }

    public Page<Hotel> findAll(Pageable pageable){
        return hotelRepository.findAll(pageable);
    }

    public Optional<Hotel> findById(Long id){
        return hotelRepository.findById(id);
    }

    public void delete(Long id){
        hotelRepository.deleteById(id);
    }
}
