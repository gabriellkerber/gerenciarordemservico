import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { ProdutosService } from '../Services/produtos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExclusaoComponent } from '../dialog-exclusao/dialog-exclusao.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogPhotoComponent } from '../dialog-photo/dialog-photo.component';
import { DialogItemDimComponent } from '../dialog-item-dim/dialog-item-dim.component';
import { DialogItemAdiComponent } from '../dialog-item-adi/dialog-item-adi.component';

@Component({
  selector: 'app-buscar-produto',
  templateUrl: './buscar-produto.component.html',
  styleUrls: ['./buscar-produto.component.scss']
})
export class BuscarProdutoComponent implements OnInit {

  displayedColumns: string[] = ['id','tipo', 'nome', 'marca', 'fornecedor', 'quantidade' ,'acoes'];
  produtos: Observable<Produto[]>;
  dataSource: MatTableDataSource<any>;
  searchKey;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private firestore: AngularFirestore,
    private produtoService: ProdutosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.produtoService.getObservable().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            id: item.id,
            tipo: item.tipo,
            marca: item.marca,
            cor: item.cor,
            nome: item.nome,
            fornecedor: item.fornecedor,
            quantidade: item.quantidade
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  async deletar(produto: Produto) {

    await this.produtoService.delete(produto);
  }

  async update(id, produto: Produto) {

    await this.produtoService.update(id,produto);
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  async openDialog(produto: Produto) {
    let DialogRef = this.dialog.open(DialogExclusaoComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
        this.deletar(produto)
        this.snackBar.open('Produto excluido com Sucesso!');
      }
    });
  }
  async openDialogPhoto(id: string) {
    let DialogRef = this.dialog.open(DialogPhotoComponent);

    // await DialogRef.afterClosed().subscribe(result =>{
    //   if(result === "true"){
    //     this.deletar(produto)
    //     this.snackBar.open('Produto excluido com Sucesso!');
    //   }
    // })
  }

  async openDialogItemAdi(id , produto: Produto) {
    let DialogRef = this.dialog.open(DialogItemAdiComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
        produto.quantidade += 1;
        console.log("a"+produto.quantidade)
        this.update(id, produto);
        this.snackBar.open('Produto adicionado com Sucesso!');
      }
    });
  }

  async openDialogItemDim(id,produto: Produto) {
    let DialogRef = this.dialog.open(DialogItemDimComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
        produto.quantidade -= 1;
        this.update(id, produto);
        this.snackBar.open('Produto diminuido com Sucesso!');
      }
    });
  }
}
