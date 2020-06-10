import { Component } from '@angular/core';
import { Aba } from './models/aba.model';
import { LoginService } from './Services/login.service';
import { Router } from '@angular/router';
import { Funcionario } from './models/funcionario.model';

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

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  async ngOnInit(){
    var verificado = this.loginService.verificar();
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

      this.funcionario = await this.loginService.retornarNome();
      console.log(this.funcionario);

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

  async Sair(){
    console.log("Saiu");
    this.mostrarMenu = false;
    await this.router.navigateByUrl("/Login");
  } 
      
}
