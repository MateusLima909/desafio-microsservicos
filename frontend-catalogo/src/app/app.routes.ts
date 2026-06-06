import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { DetalhesProduto } from './detalhes-produto/detalhes-produto';
import { Checkout } from './checkout/checkout'; 
import { Login } from './login/login'

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'product/:id', component: DetalhesProduto },
  { path: 'checkout', component: Checkout }, 
  { path: 'login', component: Login }, 
];