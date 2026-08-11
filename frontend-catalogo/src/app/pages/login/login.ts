import { Component, signal, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);

  isLoginMode = signal(true);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  nome = signal('');
  email = signal('');
  senha = signal('');

  @Output() fecharModal = new EventEmitter<void>();

  fechar() {
    this.fecharModal.emit();
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLoginMode.update(mode => !mode);
    this.showPassword.set(false);
    this.showConfirmPassword.set(false);
    
    this.nome.set('');
    this.email.set('');
    this.senha.set('');
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

    const nomeVal = this.nome().trim();
    const emailVal = this.email().trim();
    const senhaVal = this.senha().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- VALIDAÇÕES DO LOGIN ---
    if (this.isLoginMode()) {
      if (!emailVal || !senhaVal) {
        Swal.fire({
          title: 'Campos obrigatórios',
          text: 'Por favor, preencha seu e-mail e senha para entrar.',
          icon: 'warning',
          confirmButtonColor: '#0056b3'
        });
        return; 
      }

      const dadosLogin = { email: emailVal, password: senhaVal };

      this.authService.login(dadosLogin).subscribe({
        next: () => {
          Swal.fire({
            title: 'Bem-vindo de volta!',
            text: 'Acesso liberado com sucesso.',
            icon: 'success',
            timer: 1500, 
            showConfirmButton: false
          });
          this.fechar(); 
        },
        error: () => {
          Swal.fire({
            title: 'Ops!',
            text: 'E-mail ou senha incorretos.',
            icon: 'error',
            confirmButtonColor: '#ff4c4c'
          });
        }
      });

    // --- VALIDAÇÕES DO CADASTRO ---
    } else {
      
      if (!nomeVal || !emailVal || !senhaVal) {
        Swal.fire({
          title: 'Dados incompletos',
          text: 'Preencha todos os campos para criar sua conta.',
          icon: 'warning',
          confirmButtonColor: '#0056b3'
        });
        return; 
      }

      if (!emailRegex.test(emailVal)) {
        Swal.fire({
          title: 'E-mail inválido',
          text: 'Por favor, digite um endereço de e-mail válido.',
          icon: 'warning',
          confirmButtonColor: '#0056b3'
        });
        return;
      }

      if (senhaVal.length < 6) {
        Swal.fire({
          title: 'Senha muito curta',
          text: 'Sua senha deve ter pelo menos 6 caracteres.',
          icon: 'warning',
          confirmButtonColor: '#0056b3'
        });
        return;
      }

      const dadosCadastro = {
        name: nomeVal,
        email: emailVal,
        password: senhaVal
      };

      this.authService.register(dadosCadastro).subscribe({
        next: () => {
          Swal.fire({
            title: 'Conta criada!',
            text: 'Tudo certo. Agora é só fazer o seu login.',
            icon: 'success',
            confirmButtonColor: '#4caf50'
          }).then(() => {
            this.toggleMode(new Event('')); 
          });
        },
        error: () => {
          Swal.fire({
            title: 'Erro no cadastro',
            text: 'Verifique os dados ou tente outro e-mail.',
            icon: 'error',
            confirmButtonColor: '#ff4c4c'
          });
        }
      });
    }
  }
}