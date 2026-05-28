import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  public cartService = inject(CartService);

  product = signal<any>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    const found = this.cartService.products().find(p => p.id === id);
    
    this.product.set(found);
  }
}