import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { DetalhesProduto } from './detalhes-produto/detalhes-produto';

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'product/:id', component: DetalhesProduto },
];