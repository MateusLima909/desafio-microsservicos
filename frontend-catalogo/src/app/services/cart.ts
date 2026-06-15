import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  description?: string; 
  specs?: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  products = signal<Product[]>([]);
  
  cart = signal<any[]>([]);
  isCartOpen = signal(false);

  loadProductsFromBackend() {
    this.http.get<any[]>('http://localhost:8765/produtos').subscribe({
      next: (dadosDoBanco) => {
        const produtosMapeados: Product[] = dadosDoBanco.map(produto => {
          return {
            ...produto,
            specs: produto.specs ? produto.specs.split(',').map((item: string) => item.trim()) : []
          };
        });

        this.products.set(produtosMapeados);
      },
      error: (erro) => console.error('Erro ao conectar com o Gateway:', erro)
    });
  }

  toggleCart() {
    this.isCartOpen.update(val => !val);
  }

  addToCart(product: any) {
    this.cart.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          return items.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return items; 
      } else {
        if (product.stock > 0) {
          return [...items, { ...product, quantity: 1 }];
        }
        return items;
      }
    });
    this.isCartOpen.set(true);
  }

  increaseQuantity(productId: number) {
    this.cart.update(items => 
      items.map(item => {
        if (item.id === productId && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  }

  decreaseQuantity(productId: number) {
    this.cart.update(items => 
      items.map(item => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  }

  removeItem(productId: number) {
    this.cart.update(items => items.filter(item => item.id !== productId));
  }

  cartTotal = computed(() => {
    const total = this.cart().reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  });

  cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  finalizarCompra() {
    const itensDoPedido = this.cart().map(item => {
      return {
        productId: item.id,
        quantity: item.quantity
      };
    });

    const corpoRequisicao = {
      items: itensDoPedido
    };

    const cabecalhos = {
      'X-User-Email': 'cliente@pecstore.com'
    };

    this.http.post('http://localhost:8765/pedidos/criar', corpoRequisicao, { headers: cabecalhos }).subscribe({
      next: (resposta) => {
        console.log('Pedido criado com sucesso!', resposta);
        alert('Compra finalizada com sucesso! Seu pedido está sendo processado.');
        
        this.cart.set([]);
        this.isCartOpen.set(false);
      },
      error: (erro) => {
        console.error('Erro ao finalizar a compra', erro);
        alert('Ops! Ocorreu um erro ao processar seu pedido.');
      }
    });
  }

  obterMeusPedidos() {
    const cabecalhos = {
      'X-User-Email': 'cliente@pecstore.com'
    };
    
    return this.http.get<any[]>('http://localhost:8765/pedidos/meus-pedidos', { headers: cabecalhos });
  }
}