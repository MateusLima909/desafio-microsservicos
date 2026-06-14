import { Component, inject, signal, OnInit } from '@angular/core'; 
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

export class Vitrine implements OnInit {
  public cartService = inject(CartService);
  
  activeCategory = signal('Todos');
  
  ngOnInit() {
    if (this.cartService.products().length === 0) {
      this.cartService.loadProductsFromBackend();
    }
  }
  
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