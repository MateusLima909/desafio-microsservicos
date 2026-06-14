import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.css'
})
export class DetalhesProduto implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  public cartService = inject(CartService);

  product = signal<any>(null);

  constructor() {
    effect(() => {
      const produtosNoService = this.cartService.products();
      
      if (produtosNoService.length > 0) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const found = produtosNoService.find(p => p.id === id);
        this.product.set(found);
      }
    });
  }

  ngOnInit() {
    if (this.cartService.products().length === 0) {
      this.cartService.loadProductsFromBackend();
    }
  }

  payNow(produto: any) {
    this.cartService.addToCart(produto); 
    this.router.navigate(['/checkout']); 
  }
}