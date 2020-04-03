import { Component } from '@angular/core';
import { Aba } from './aba.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  abas: Aba[] = [];

  constructor() { }

  ngOnInit(): void {

    this.abas = [
      {
        label: 'Cadastrando O.S.',
        title: 'O.S.',
        icon: 'post_add',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
      },
      {
        label: 'Cadastrando Produtos',
        title: 'Produtos',
        icon: 'local_grocery_store',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
      },
      {
        label: 'Cadastrando Clientes',
        title: 'Clientes',
        icon: 'person',
        menu1: 'Cadastrar',
        menu2: 'Buscar',
      },

    ];
  }
      
}
