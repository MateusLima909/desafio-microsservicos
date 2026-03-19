package edu.mateus.catalogoprodutos.orderservice;

public record ProductDTO(Long id, String name, Double price, Integer stock) { }