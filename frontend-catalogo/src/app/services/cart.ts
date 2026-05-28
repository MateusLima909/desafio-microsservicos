import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products = signal<any[]>([
    { id: 1, name: 'Guitarra Strato HSS', price: 2850.00, stock: 3, image: 'https://placehold.co/400x400/253745/CCD0CF?text=Guitarra', category: 'Guitarras' },
    { id: 2, name: 'Pedal Multi-efeitos IR Loader', price: 450.00, stock: 15, image: 'https://placehold.co/400x400/253745/CCD0CF?text=Pedal+IR', category: 'Pedais & Efeitos' },
    { id: 3, name: 'Kit de Pratos B20', price: 1890.00, stock: 7, image: 'https://placehold.co/400x400/253745/CCD0CF?text=Pratos', category: 'Baterias' },
    { id: 4, name: 'Interface de Áudio 2x2', price: 750.00, stock: 12, image: 'https://placehold.co/400x400/253745/CCD0CF?text=Interface', category: 'Áudio Pro' }
  ]);

  cart = signal<any[]>([]);
  isCartOpen = signal(false);

  cartCount = computed(() => this.cart().length);
  cartTotal = computed(() => this.cart().reduce((total, item) => total + item.price, 0));

  addToCart(product: any) {
    this.cart.update(current => [...current, product]);
  }

  toggleCart() {
    this.isCartOpen.set(!this.isCartOpen());
  }
}