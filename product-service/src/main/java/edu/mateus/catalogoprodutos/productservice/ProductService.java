package edu.mateus.catalogoprodutos.productservice;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> listAll() {
        return repository.findAll();
    }

    public Product create(Product product) {
        return repository.save(product);
    }

    public Product update(Long id, Product productDetails) {
        Product product = repository.findById(id).orElseThrow();

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());

        return repository.save(product);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}