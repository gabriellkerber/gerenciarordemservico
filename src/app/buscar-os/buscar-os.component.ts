import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordem } from '../models/ordem.model';
import { OrdensService } from '../Services/ordens.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog,} from '@angular/material/dialog';
import { DialogExclusaoComponent } from '../dialog-exclusao/dialog-exclusao.component';
@Component({
  selector: 'app-buscar-os',
  templateUrl: './buscar-os.component.html',
  styleUrls: ['./buscar-os.component.scss']
})
export class BuscarOSComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'equipamento', 'modelo','valorEntrada', 'valorTotal','acoes'];
  ordens: Observable<Ordem[]>;
  dataSource: MatTableDataSource<any>;
  searchKey;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private ordensService: OrdensService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ordensService.getObservable().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            id: item.id,
            equipamento: item.equipamento,
            modelo: item.modelo,
            nome: item.nome,
            valorEntrada: item.valorEntrada,
            valorTotal: item.valorTotal
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  async openDialog(ordens: Ordem) {
    let DialogRef = this.dialog.open(DialogExclusaoComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      console.log(result)
      if(result === "true"){
        this.deletar(ordens)
      }
    })
  }

  async deletar(ordens: Ordem) {
      await this.ordensService.delete(ordens);
      this.snackBar.open('Ordem Excluida com Sucesso!');
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
