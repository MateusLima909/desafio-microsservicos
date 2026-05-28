import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart'; //

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.html',
  imports: [RouterLink],
  styleUrl: './vitrine.css'
})

export class Vitrine {
  public cartService = inject(CartService);
  
  activeCategory = signal('Todos');

  filteredProducts = computed(() => {
    const selected = this.activeCategory();
    if (selected === 'Todos') {
      return this.cartService.products(); 
    }
    return this.cartService.products().filter((p: any) => p.category === selected);
  });

  changeCategory(newCategory: string) {
    this.activeCategory.set(newCategory);
  }
}