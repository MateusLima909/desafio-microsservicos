package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.mateus.catalogoprodutos.productservice.Product;


@RestController
@RequestMapping("/pedidos")
public class OrderController {

    private final OrderService service;

    @Autowired
    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/simular")
    public String simulateOrder(@RequestBody List<Long> productIds) {
        return service.simulateOrder(productIds);
    }

    @PostMapping("/criar")
    public OrderResponseDTO createOrder(@RequestBody List<Long> productIds) {
        return service.createOrder(productIds);
    }
}