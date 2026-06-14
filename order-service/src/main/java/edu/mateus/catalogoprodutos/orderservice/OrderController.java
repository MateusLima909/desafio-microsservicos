package edu.mateus.catalogoprodutos.orderservice;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor 
public class OrderController {

    private final OrderService service;

    @PostMapping("/criar")
    public OrderResponseDTO createOrder(
            @RequestBody OrderRequestDTO request,
            @RequestHeader(value = "X-User-Email", defaultValue = "cliente@pecstore.com") String customerEmail
    ) {
        return service.createOrder(request, customerEmail);
    }
}