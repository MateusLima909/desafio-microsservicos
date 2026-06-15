package edu.mateus.catalogoprodutos.orderservice;

import java.math.BigDecimal;

public record OrderItemResponseDTO(
    Long id,
    String productName,
    Integer quantity,
    BigDecimal singlePrice
) {
}