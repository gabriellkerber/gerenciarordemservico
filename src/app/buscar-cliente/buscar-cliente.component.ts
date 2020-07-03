import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { idCliente } from '../models/idCliente.model';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogExclusaoComponent } from '../dialog-exclusao/dialog-exclusao.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'endereco', 'acoes'];
  clientes: Observable<Cliente[]>;
  dataSource: MatTableDataSource<any>;
  searchKey;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }



 async ngOnInit() {

  this.clienteService.getObservable().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            id: item.id,
            cpf: item.cpf,
            endereco: item.endereco,
            nome: item.nome,
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  
  async deletar(cliente: Cliente) {

    await this.clienteService.delete(cliente);
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  async openDialog(cliente: Cliente) {
    let DialogRef = this.dialog.open(DialogExclusaoComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
        this.deletar(cliente);
        this.snackBar.open('Cliente excluido com Sucesso!');
      }
    })
  }
}
