package com.proyecto.backend.controller;

import com.proyecto.backend.model.Category;
import com.proyecto.backend.repository.CategoryRepository;
import com.proyecto.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }



    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryByIdResponse(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
