package edu.mateus.catalogoprodutos.orderservice;

import java.util.List;

public record OrderResponseDTO(
    Long id,
    String orderProtocol,
    String timePurchase,
    String status,
    Double totalValue,
    List<OrderItemResponseDTO> items
) { }