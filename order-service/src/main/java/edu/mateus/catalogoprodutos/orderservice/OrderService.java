package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private ProductClient productClient;

    public OrderService (ProductClient productClient) {
        this.productClient = productClient;
    }

    public String simulateOrder(List<Long> productIds) {
        
        List<ProductDTO> specificProducts = new ArrayList<>();

        for (Long idProducts : productIds) {
            ProductDTO foundProduct = productClient.findById(idProducts);
            specificProducts.add(foundProduct);
        }

        double totalPrice = specificProducts.stream()
                .mapToDouble(ProductDTO::price)
                .sum();

        String productsNames = specificProducts.stream()
                .map(ProductDTO::name)
                .collect(Collectors.joining(", "));

        return "Pedido Simulado com Sucesso para os Produtos: [" + productsNames + "]. Valor total: R$ " + String.format("%.2f", totalPrice);
    }
}