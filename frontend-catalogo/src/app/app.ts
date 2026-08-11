import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import Swal from 'sweetalert2'; 

import { CartService } from './core/services/cart.service';
import { AuthService } from './core/services/auth.service';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Login], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  public cartService = inject(CartService);
  public auth = inject(AuthService);
  private router = inject(Router); 

  isLoginOpen = signal(false); 

  fazerLogout() {
    this.auth.logout();
    
    Swal.fire({
      title: 'Até logo!',
      text: 'Você saiu da conta com sucesso.',
      icon: 'success',
      confirmButtonColor: '#4caf50'
    });

    this.router.navigate(['/']); 
  }

 processarCheckout() {
    if (!this.auth.isLoggedIn()) {
      
      this.cartService.toggleCart(); 

      Swal.fire({
        title: 'Acesso Restrito',
        text: 'Você precisa estar logado para finalizar a compra!',
        icon: 'warning',
        confirmButtonColor: '#0056b3'
      }).then(() => {
        this.isLoginOpen.set(true);    
      });

    } else {
      this.cartService.toggleCart(); 
      this.router.navigate(['/checkout']); 
    }
  }
}