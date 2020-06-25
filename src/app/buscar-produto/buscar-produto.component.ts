import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { ProdutosService } from '../Services/produtos.service';
import { Marca } from '../models/marca.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buscar-produto',
  templateUrl: './buscar-produto.component.html',
  styleUrls: ['./buscar-produto.component.scss']
})
export class BuscarProdutoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'marca', 'cor', 'fornecedor', 'quantidade' ,'acoes'];
  produtos: Observable<Produto[]>;
  marcas: Observable<Marca[]>;
  dataSource: MatTableDataSource<any>;
  searchKey;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private firestore: AngularFirestore,
    private produtoService: ProdutosService
    ) { }

  ngOnInit(): void {
    this.produtoService.getObservable().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            id: item.id,
            marca: item.idMarca,
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

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
