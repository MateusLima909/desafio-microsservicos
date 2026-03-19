package edu.mateus.catalogoprodutos.orderservice;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.*;

@Entity
@table("order_item")
public class OrderItem {
     
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Long productId;
    private Integer quantity;
    private Double singlePrice;

    public OrderItem() {}
    
    public OrderItem(Order order, Long productId, Integer quantity, Double singlePrice) {
        this.order = order;
        this.productId = productId;
        this.quantity = quantity;
        this.singlePrice = singlePrice;
    }

    public Order getOrder() { return order; }
    public Long getProductId() { return productId; }
    public Integer getQuantity() { return quantity; }
    public Double getSinglePrice() { return singlePrice; }
}