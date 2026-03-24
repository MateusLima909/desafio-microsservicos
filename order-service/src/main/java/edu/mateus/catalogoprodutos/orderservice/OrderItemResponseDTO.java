package edu.mateus.catalogoprodutos.orderservice;

public record OrderItemResponseDTO(
    Long id,
    Integer quantity,
    Double singlePrice
) {
}