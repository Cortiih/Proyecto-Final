package com.proyecto.backend.service;

import com.proyecto.backend.model.Feature;
import com.proyecto.backend.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {

    private FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<Feature> findAll(){
        return featureRepository.findAll();
    }

    public Feature save(Feature feature){
        return featureRepository.save(feature);
    }

    public Feature update(Long id, Feature feature) {
        Feature existing = featureRepository.findById(id).orElseThrow();
        existing.setName(feature.getName());
        existing.setIcon(feature.getIcon());
        return featureRepository.save(existing);
    }

    public void delete(Long id) {
        featureRepository.deleteById(id);
    }
}
