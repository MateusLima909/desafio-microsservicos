package edu.mateus.catalogoprodutos.orderservice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductClient productClient;
    private final OrderRepository orderRepository;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO request, String customerEmail) {
        
        Order order = new Order();
        order.setOrderProtocol("PROT-" + System.currentTimeMillis());
        order.setCustomerEmail(customerEmail);

        for (OrderItemRequestDTO itemRequest : request.items()) {
            
            ProductDTO foundProduct = productClient.findById(itemRequest.productId());
            
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .productId(itemRequest.productId())
                    .quantity(itemRequest.quantity()) 
                    .singlePrice(foundProduct.price())
                    .build();
            
            order.getItems().add(item);

            int newStock = foundProduct.stock() - item.getQuantity();
            if (newStock < 0) {
                throw new RuntimeException("Produto " + foundProduct.name() + " está sem estoque.");
            }

            productClient.updateStockTimePurchase(itemRequest.productId(), item.getQuantity());
        }

        order.calculateTotalValue();
        orderRepository.save(order);

        return new OrderResponseDTO(  
            order.getId(), 
            order.getCustomerEmail(),
            order.getOrderProtocol(), 
            order.getTimePurchase() != null ? order.getTimePurchase().toString() : "Gerando data...", 
            order.getStatus() != null ? order.getStatus().toString() : "PENDENTE", 
            order.getTotalValue(),
            order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(item.getProductId(), item.getQuantity(), item.getSinglePrice()))
                .collect(Collectors.toList())
        );
    }
}