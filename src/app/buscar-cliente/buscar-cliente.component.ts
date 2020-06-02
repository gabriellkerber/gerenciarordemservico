import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent implements OnInit {

  displayedColumns: string[] = ['idPessoal', 'nome', 'cpf', 'endereco', 'acoes'];
  clientes: Observable<Cliente[]>;
  dataSource;
  


  constructor(private firestore: AngularFirestore,private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.clientes = this.clienteService.getObservable();
    this.dataSource = this.clientes;

  }

}
