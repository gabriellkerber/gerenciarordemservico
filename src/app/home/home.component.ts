import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  constructor() { }

  ngOnInit(): void {

  this.funcionarios = [{
    id: "01",
    nome: "Gabriel",
    idade: "22",
    senha: "2205"
  }];

  }

}
