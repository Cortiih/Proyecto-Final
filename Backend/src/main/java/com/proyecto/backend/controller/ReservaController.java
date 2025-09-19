package com.proyecto.backend.controller;

import com.proyecto.backend.model.Reserva;
import com.proyecto.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/save")
    public Reserva save(@RequestBody Reserva reserva){
        return reservaService.save(reserva);
    }

    @GetMapping("/list")
    public List<Reserva> getAll(){
        return reservaService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> findById(@PathVariable Long id){
        return reservaService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        reservaService.delete(id);
    }

}
