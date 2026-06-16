import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import { CartService } from './services/cart';
import { Auth } from './services/auth'; 
import { Login } from './login/login';
import Swal from 'sweetalert2'; // <-- Importação aqui no topo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Login], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public cartService = inject(CartService);
  public auth = inject(Auth);
  private router = inject(Router); 

  isLoginOpen = signal(false); 

  fazerLogout() {
    this.auth.logout();
    
    // Alert moderno de Sucesso
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