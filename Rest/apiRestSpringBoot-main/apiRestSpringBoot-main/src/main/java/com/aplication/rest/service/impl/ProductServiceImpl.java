package com.aplication.rest.service.impl;

import com.aplication.rest.entities.Product;
import com.aplication.rest.persistence.IMakerDAO;
import com.aplication.rest.persistence.IProductDAO;
import com.aplication.rest.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductDAO productDAO;

    @Autowired
    private IMakerDAO makerDAO;

    @Override
    public List<Product> findAll() {
        return productDAO.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productDAO.findById(id);
    }

    @Override
    public List<Product> findByPriceinRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productDAO.findByPriceinRange(minPrice, maxPrice);
    }

    @Override

    public void save(Product product) {

        // Ejemplo de manejo del Maker asociado al Product
        if (product.getMaker() != null && product.getMaker().getId() == null) {
            makerDAO.save(product.getMaker()); // Guardar el Maker si es nuevo
        }

        productDAO.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productDAO.deleteById(id);
    }
}
