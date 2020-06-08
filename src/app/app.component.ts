import { Component } from '@angular/core';
import { Aba } from './models/aba.model';
import { LoginService } from './Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = true;
  abas: Aba[] = [];
  mostrarMenu: boolean = false;
  constructor(private loginService: LoginService, private router: Router) { }

  async ngOnInit(){
    var verificado = this.loginService.verificar();
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

    this.abas = [
      {
        title: 'O.S.',
        icon: 'post_add',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/OS",
        link2:"/Buscar/OS",
      },
      {
        title: 'Produtos',
        icon: 'local_grocery_store',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/Produto",
        link2:"/Buscar/Produto",
      },
      {
        title: 'Clientes',
        icon: 'person',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/Cliente",
        link2:"/Buscar/Cliente",
      },

    ];
  }

  fechar(){
    console.log("fechou")
    this.panelOpenState = false;
  } 

  deslogar(){
    this.loginService.fazerLogin(null);
    this.router.navigateByUrl("/Login");
  }
      
}
