import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { CadOSComponent } from './cad-os/cad-os.component';
import { BuscarOSComponent } from './buscar-os/buscar-os.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';


const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Cliente', component: ClienteComponent },
  { path: 'BuscarCliente', component: BuscarClienteComponent },
  { path: 'CadastrarOS', component: CadOSComponent },
  { path: 'BuscarOS', component: BuscarOSComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
