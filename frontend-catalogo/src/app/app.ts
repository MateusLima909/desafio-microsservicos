import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { CartService } from './services/cart';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Login], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public cartService = inject(CartService);

  isLoginOpen = signal(false); 
}