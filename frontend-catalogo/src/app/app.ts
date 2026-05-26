import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  http = inject(HttpClient);
  
  // Criando a variável como um Signal (reativa)
  produtos = signal<any>([]);

  ngOnInit() {
    this.http.get('http://localhost:8765/produtos').subscribe({
      next: (dados) => {
        // O .set() atualiza o valor e manda a tela se redesenhar instantaneamente
        this.produtos.set(dados); 
      },
      error: (erro) => {
        console.error('Erro na comunicação com o Gateway:', erro);
      }
    });
  }
}