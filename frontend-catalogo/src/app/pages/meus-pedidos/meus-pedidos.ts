import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../core/services/cart.service'; 

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {
  
  private cartService = inject(CartService);
  
  pedidos = signal<any[]>([]);

  pedidoExpandidoId: number | null = null;

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.cartService.obterMeusPedidos().subscribe({
      next: (dadosDoBanco) => {
        this.pedidos.set(dadosDoBanco);
      },
      error: (erro) => {
        console.error('Erro ao buscar o histórico de pedidos:', erro);
      }
    });
  }

  toggleDetalhes(id: number) {
    if (this.pedidoExpandidoId === id) {
      this.pedidoExpandidoId = null;
    } else {
      this.pedidoExpandidoId = id;
    }
  }
}