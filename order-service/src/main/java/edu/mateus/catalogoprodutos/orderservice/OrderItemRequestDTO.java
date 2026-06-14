package edu.mateus.catalogoprodutos.orderservice;

public record OrderItemRequestDTO(
        Long productId,
        Integer quantity
) { }
