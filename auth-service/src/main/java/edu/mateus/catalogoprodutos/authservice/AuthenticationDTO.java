package edu.mateus.catalogoprodutos.authservice;

public record AuthenticationDTO(
    String email, 
    String password
) {}