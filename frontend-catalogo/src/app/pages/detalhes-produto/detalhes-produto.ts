import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service'; 

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
  private authService = inject(AuthService); 

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
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        title: 'Acesso Restrito',
        text: 'Você precisa estar logado para comprar um produto!',
        icon: 'warning',
        confirmButtonColor: '#0056b3'
      });
      return; 
    }

    this.cartService.addToCart(produto); 
    this.router.navigate(['/checkout']); 
  }
}