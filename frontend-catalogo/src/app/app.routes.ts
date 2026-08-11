import { Routes } from '@angular/router';
import { Vitrine } from './pages/vitrine/vitrine';
import { DetalhesProduto } from './pages/detalhes-produto/detalhes-produto';
import { Checkout } from './pages/checkout/checkout'; 
import { Login } from './pages/login/login'
import { MeusPedidos } from './pages/meus-pedidos/meus-pedidos';

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'product/:id', component: DetalhesProduto },
  { path: 'checkout', component: Checkout }, 
  { path: 'login', component: Login }, 
  { path: 'meus-pedidos', component: MeusPedidos },
];