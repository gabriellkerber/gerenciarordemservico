import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ClienteComponent } from './cad-cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { CadOSComponent } from './cad-os/cad-os.component';
import { BuscarOSComponent } from './buscar-os/buscar-os.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { BuscarProdutoComponent } from './buscar-produto/buscar-produto.component';


const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Cadastrar/Cliente', component: ClienteComponent },
  { path: 'Buscar/Cliente', component: BuscarClienteComponent },
  { path: 'Cadastrar/OS', component: CadOSComponent },
  { path: 'Buscar/OS', component: BuscarOSComponent },
  { path: 'Cadastrar/Produto', component: CadProdutoComponent },
  { path: 'Buscar/Produto', component: BuscarProdutoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
