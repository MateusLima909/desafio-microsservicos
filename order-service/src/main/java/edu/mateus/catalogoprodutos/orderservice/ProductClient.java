package edu.mateus.catalogoprodutos.orderservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/produtos/{id}")
    ProductDTO findById(@PathVariable("id") Long id);
    
    @PutMapping("/produtos/{id}/stock")
    ProductDTO updateStockTimePurchase(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity);
}