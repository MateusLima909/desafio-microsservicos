package edu.mateus.catalogoprodutos.orderservice;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponseDTO(
    Long id,
    String customerEmail,
    String orderProtocol,
    String timePurchase,
    String status,
    BigDecimal totalValue,
    List<OrderItemResponseDTO> items
) { }