import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = signal<any[]>([
    {
      id: 1,
      name: 'Guitarra Strato HSS',
      price: 2850,
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=500&auto=format&fit=crop',
      category: 'Guitarras',
      stock: 5,
      descricao: 'Corpo em Alder, braço em Maple com perfil "C". Configuração HSS versátil, ideal para quem transita entre o clean cristalino e drives mais pesados.',
      specs: ['Captador Humbucker na ponte', 'Tarraxas com trava', 'Trastes Jumbo']
    },
    {
      id: 2,
      name: 'Pedal Multi-efeitos IR Loader',
      price: 450,
      image: 'https://images.unsplash.com/photo-1543884878-8314ba6353ea?q=80&w=500&auto=format&fit=crop',
      category: 'Pedais & Efeitos',
      stock: 12,
      descricao: 'Carregue seus próprios Impulse Responses (IRs) de gabinetes lendários. Inclui simulação de pré-amps clássicos, delays e reverbs de estúdio.',
      specs: ['Suporta até 32 arquivos IR', 'Saída XLR balanceada', 'Software de edição via USB']
    }
  ]);

  cart = signal<any[]>([]);
  isCartOpen = signal(false);

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
}