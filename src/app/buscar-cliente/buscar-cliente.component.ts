import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { idCliente } from '../models/idCliente.model';


@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent implements OnInit {

  displayedColumns: string[] = ['idPessoal', 'nome', 'cpf', 'endereco', 'acoes'];
  clientes: Observable<Cliente[]>;
  idClientes: Observable<idCliente[]>;
  dataSource;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService
    ) { }

 async ngOnInit() {

    this.clientes = this.clienteService.getObservable();
    this.dataSource = this.clientes;
  }

  
  async deletar(cliente: Cliente) {

    await this.clienteService.delete(cliente);
  }

}
