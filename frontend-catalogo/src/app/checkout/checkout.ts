import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  public cartService = inject(CartService);

  finalizarCompra() {
    alert('Pedido realizado com sucesso! A PECStore agradece sua compra 🎸');
    // No futuro, essa função vai mandar os dados para o seu back-end em Java!
  }
}