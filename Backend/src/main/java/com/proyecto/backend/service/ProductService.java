package com.proyecto.backend.service;


import com.proyecto.backend.model.Product;
import com.proyecto.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) throws Exception{
        if (productRepository.existsByName(product.getName())){
            throw new Exception("El nombre ya esta en uso");
        }
        return productRepository.save(product);
    }

    public List<Product> getAll(){
        return productRepository.findAll();
    }
}
