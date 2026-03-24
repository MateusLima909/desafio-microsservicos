package edu.mateus.catalogoprodutos.orderservice;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    private String orderProtocol;
    private LocalDateTime timePurchase;
    private Double totalValue;

    public Order() {}

    public Order(String orderProtocol) {
        this.orderProtocol = orderProtocol;
        this.timePurchase = LocalDateTime.now();
        this.status = Status.PENDENTE;
    }

    public Long getId() { return id; }
    public LocalDateTime getTimePurchase() { return timePurchase; }
    public Status getStatus() { return status; }
    public Double getTotalValue() { return totalValue; }

    public void calculateTotalValue() {
        this.totalValue = items.stream()
                .mapToDouble(item -> item.getSinglePrice() * item.getQuantity())
                .sum();
    }
}