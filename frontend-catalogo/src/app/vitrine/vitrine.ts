import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common'; 
import { CartService } from '../services/cart';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, SlicePipe], 
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})

export class Vitrine {
  public cartService = inject(CartService);
  
  activeCategory = signal('Todos');
  
  filteredProducts = () => {
    if (this.activeCategory() === 'Todos') {
      return this.cartService.products();
    }
    return this.cartService.products().filter(p => p.category === this.activeCategory());
  };

  changeCategory(category: string) {
    this.activeCategory.set(category);
  }
}