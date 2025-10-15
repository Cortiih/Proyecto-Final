package com.proyecto.backend.service;

import com.proyecto.backend.model.Category;
import com.proyecto.backend.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Guardar con validaciones
    public ResponseEntity<?> saveCategory(Category category) {
        if (category.getName() == null || category.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre de la categoría es obligatorio");
        }

        // Validar título único
        Optional<Category> existing = categoryRepository.findByName(category.getName());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("El nombre de la categoría ya existe");
        }

        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(saved);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public ResponseEntity<?> getCategoryByIdResponse(Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Categoría eliminada con éxito");
    }
}

