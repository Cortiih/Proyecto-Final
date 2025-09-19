package com.proyecto.backend.service;

import com.proyecto.backend.model.Reserva;
import com.proyecto.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    //save
    public Reserva save(Reserva reserva){
        return reservaRepository.save(reserva);
    }

    //listar
    public List<Reserva> findAll(){
        return reservaRepository.findAll();
    }

    //findbyid
    public Optional<Reserva> findById(Long id){
        return reservaRepository.findById(id);
    }
    //borrar
    public void delete(Long id){
        reservaRepository.deleteById(id);
    }
}
