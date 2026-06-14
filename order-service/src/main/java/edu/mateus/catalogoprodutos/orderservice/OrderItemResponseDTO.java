package edu.mateus.catalogoprodutos.orderservice;

import java.math.BigDecimal;

public record OrderItemResponseDTO(
    Long id,
    Integer quantity,
    BigDecimal singlePrice
) {
}