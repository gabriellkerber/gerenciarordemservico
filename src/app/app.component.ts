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
  funcionario: string;
  nomeLogado;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  async ngOnInit(){


    var verificado = this.loginService.verificar();
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

    this.loginService.nomeEmitter.subscribe(nome => this.nomeLogado = nome)

    if(this.mostrarMenu != true){
      await this.router.navigateByUrl("/Login");
    }

    this.abas = [
      {
        title: 'O.S.',
        icon: 'post_add',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/OS",
        link2:"/Buscar/OS",
        icon1:"addchart",
        icon2:"search"
      },
      {
        title: 'Produtos',
        icon: 'local_grocery_store',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/Produto",
        link2:"/Buscar/Produto",
        icon1:"post_add",
        icon2:"search"
      },
      {
        title: 'Clientes',
        icon: 'person',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
        link1:"/Cadastrar/Cliente",
        link2:"/Buscar/Cliente",
        icon1:"person_add",
        icon2:"person_search"
      },

    ];
  }

  async Sair(){
    this.mostrarMenu = false;
    await this.router.navigateByUrl("/Login");
  } 

  retornarNome(){
    return this.nomeLogado;
  }
      
}
