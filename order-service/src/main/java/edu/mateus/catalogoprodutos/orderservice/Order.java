package edu.mateus.catalogoprodutos.orderservice;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerEmail;

    @Column(unique = true, nullable = false)
    private String orderProtocol;

    @Column(nullable = false)
    private LocalDateTime timePurchase;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalValue;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (this.timePurchase == null) {
            this.timePurchase = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = Status.PENDENTE;
        }
    }

    public void calculateTotalValue() {
        this.totalValue = items.stream()
                .map(item -> item.getSinglePrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}