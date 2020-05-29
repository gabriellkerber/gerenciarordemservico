import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente;
  key: string = '';

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  onSubmit(){
    if(this.key){

    }else{
      this.clienteService.atualizarLista();
    }
    this.cliente = new Cliente();
  }
}
