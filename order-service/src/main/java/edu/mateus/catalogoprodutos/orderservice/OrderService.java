package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private ProductClient productClient;
    private OrderRepository orderRepository;

    public OrderService (ProductClient productClient, OrderRepository orderRepository) {
        this.productClient = productClient;
        this.orderRepository = orderRepository;
    }

    public OrderResponseDTO createOrder(List<Long> productIds) {
        Order order = new Order("PROT-" + System.currentTimeMillis());

        for (Long idProducts : productIds) {
            ProductDTO foundProduct = productClient.findById(idProducts);
            OrderItem item = new OrderItem(order, idProducts, 1, foundProduct.price());
            order.getItems().add(item);

            int newStock = foundProduct.stock() - item.getQuantity();
            if (newStock < 0) {
                throw new RuntimeException("Produto " + foundProduct.name() + " está sem estoque.");
            }

            productClient.updateStockTimePurchase(idProducts, item.getQuantity());
        }

        order.calculateTotalValue();
        orderRepository.save(order);

        OrderResponseDTO orderResponse = new OrderResponseDTO(  
            order.getId(), 
            order.getOrderProtocol(), 
            order.getTimePurchase().toString(), 
            order.getStatus().toString(), 
            order.getTotalValue(),
            order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(item.getProductId(), item.getQuantity(), item.getSinglePrice()))
                .collect(Collectors.toList())
        );

        return orderResponse;
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