package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductClient {

    @GetMapping("/produtos/{id}")
    ProductDTO findById(@PathVariable("id") Long id);
    
    @PutMapping("/produtos/{id}/stock")
    ProductDTO updateStockTimePurchase(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity);
}
