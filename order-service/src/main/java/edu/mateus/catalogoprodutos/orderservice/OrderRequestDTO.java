package edu.mateus.catalogoprodutos.orderservice;

import java.util.List;

public record OrderRequestDTO(
    List<OrderItemRequestDTO> items
){}
