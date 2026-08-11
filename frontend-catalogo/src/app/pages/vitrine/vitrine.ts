import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common'; 

import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, SlicePipe], 
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine {
  
  public cartService = inject(CartService);
  public productService = inject(ProductService);
  
  activeCategory = signal('Todos');
  
  filteredProducts = computed(() => {
    const category = this.activeCategory();

    if (category === 'Todos') {
      return this.productService.getProducts();
    }

    return this.productService.getProductsByCategory(category);
  });

  changeCategory(category: string) {
    this.activeCategory.set(category);
  }

  rolarPara(idElemento: string) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      elemento.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
}