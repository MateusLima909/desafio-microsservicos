package edu.mateus.catalogoprodutos.orderservice;

import java.math.BigDecimal;

public record ProductDTO(
        Long id,
        String name,
        BigDecimal price,
        Integer stock,
        String imageUrl,
        String category
){ }