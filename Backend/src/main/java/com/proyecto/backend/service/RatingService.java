package com.proyecto.backend.service;

import com.proyecto.backend.model.Rating;
import com.proyecto.backend.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> getRatingsByHotel(Long hotelId) {
        return ratingRepository.findByHotelId(hotelId);
    }

    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    public Double getAverageRating(Long hotelId) {
        List<Rating> ratings = ratingRepository.findByHotelId(hotelId);
        if (ratings.isEmpty()) return 0.0;
        return ratings.stream().mapToInt(Rating::getScore).average().orElse(0.0);
    }
}

