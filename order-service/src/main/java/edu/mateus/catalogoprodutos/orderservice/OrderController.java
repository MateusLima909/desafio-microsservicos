package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.beans.ConstructorProperties;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final ProductClient productClient;

    @Autowired
    public OrderController(ProductClient productClient) {
        this.productClient = productClient;
    }

    @PostMapping("/simulate")
    public String simulateOrder(@RequestBody List<Long> productIds) {
        
        List<ProductDTO> allProducts = productClient.getAllProducts();

        List<ProductDTO> orderedProducts = allProducts.stream()
                .filter(product -> productIds.contains(product.id()))
                .toList();

        double totalPrice = orderedProducts.stream()
                .mapToDouble(ProductDTO::price)
                .sum();

        String productsNames = orderedProducts.stream()
                .map(ProductDTO::name)
                .collect(Collectors.joining(", "));

        return "Pedido Simulado com Sucesso para os Produtos: [" + productsNames + "]. Valor total: R$ " + String.format("%.2f", totalPrice);
    }
}