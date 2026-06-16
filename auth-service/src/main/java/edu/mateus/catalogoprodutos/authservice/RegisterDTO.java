package edu.mateus.catalogoprodutos.authservice;

public record RegisterDTO(
    String name, 
    String email, 
    String password
) {}