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

    public Product findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o ID: " + id));
    }

    public Product create(Product product) {
        if (product.getPrice() < 0) {
            throw new IllegalArgumentException("Preço inválido! O valor não pode ser menor que 0!");
        }

        return repository.save(product);
    }

    public Product update(Long id, Product productDetails) {
        Product product = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());

        return repository.save(product);
    }

    public void delete(Long id) {
        Product product = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));
        repository.delete(product);
    }

    public Product updateStockTimePurchase(Long id, Integer quantity) {
        Product product = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));
        
        int newStock = product.getStock() - quantity;

        if (newStock < 0) {
            throw new IllegalArgumentException("Estoque insuficiente para o produto: " + product.getName());
        }

        product.setStock(newStock);

        return repository.save(product);
    }
}