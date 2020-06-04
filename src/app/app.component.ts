import { Component } from '@angular/core';
import { Aba } from './models/aba.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = true;
  abas: Aba[] = [];

  constructor() { }

  ngOnInit(): void {
    

  

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
      
}
