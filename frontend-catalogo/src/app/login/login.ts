import { Component, signal, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = signal(true);
  showPassword = signal(false);
  showConfirmPassword = signal(false);


  @Output() fecharModal = new EventEmitter<void>();

  fechar() {
    this.fecharModal.emit();
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLoginMode.update(mode => !mode);
    this.showPassword.set(false);
    this.showConfirmPassword.set(false);
  }

  togglePassword(type: 'senha' | 'confirma') {
    if (type === 'senha') {
      this.showPassword.update(v => !v);
    } else {
      this.showConfirmPassword.update(v => !v);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoginMode()) {
      alert('Acesso liberado! Bem-vindo de volta.');
    } else {
      alert('Conta criada com sucesso! Bem-vindo à PECStore.');
    }
  }
}