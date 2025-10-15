package com.proyecto.backend.controller;

import com.proyecto.backend.model.Feature;
import com.proyecto.backend.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "http://localhost:5173")
public class FeatureController {

    private FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public ResponseEntity<List<Feature>> getAll() {
        return ResponseEntity.ok(featureService.findAll());
    }

    @PostMapping
    public ResponseEntity<Feature> addFeature(@RequestBody Feature feature) {
        return ResponseEntity.ok(featureService.save(feature));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(@PathVariable Long id, @RequestBody Feature feature) {
        return ResponseEntity.ok(featureService.update(id, feature));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
