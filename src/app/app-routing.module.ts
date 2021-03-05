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
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { LoginComponent } from './login/login.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { EditarOsComponent } from './editar-os/editar-os.component';
import { BuscarOrdemComponent } from './buscar-ordem/buscar-ordem.component';
import { DialogSenhaComponent } from './dialog-senha/dialog-senha.component';


const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Cadastrar/Produto', component: CadProdutoComponent },
  { path: 'Cadastrar/Cliente', component: ClienteComponent },
  { path: 'Cadastrar/OS', component: CadOSComponent },
  { path: 'Senha', component: DialogSenhaComponent },
  { path: 'Buscar/Cliente', component: BuscarClienteComponent },
  { path: 'Buscar/OS', component: BuscarOSComponent },
  { path: 'Buscar/:id/Ordem', component: BuscarOrdemComponent},
  { path: 'Buscar/Produto', component: BuscarProdutoComponent },
  { path: 'Editar/:id/Cliente', component: EditarClienteComponent },
  { path: 'Editar/:id/Produto', component: EditarProdutoComponent },
  { path: 'Editar/:id/Ordem', component: EditarOsComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
