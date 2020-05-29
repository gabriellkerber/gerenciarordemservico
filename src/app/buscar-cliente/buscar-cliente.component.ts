import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente';


@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent implements OnInit {

  clientes: Cliente [] = [];

  constructor(private firestore: AngularFirestore,private clienteService: ClienteService) { }

  ngOnInit(): void {
      this.firestore.collection<Cliente>('Clientes').get()
      .toPromise()
      .then(documentData => {

        this.clientes = documentData.docs.map(doc =>{ 
          return {
            id: doc.id, ...doc.data()
          } as Cliente;
        });
  
      }).catch(error => {
        console.log(error);
      });

  }
}
