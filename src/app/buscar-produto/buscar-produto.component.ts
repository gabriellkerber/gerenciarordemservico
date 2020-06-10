import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { ProdutosService } from '../Services/produtos.service';
import { Marca } from '../models/marca.model';

@Component({
  selector: 'app-buscar-produto',
  templateUrl: './buscar-produto.component.html',
  styleUrls: ['./buscar-produto.component.scss']
})
export class BuscarProdutoComponent implements OnInit {

  displayedColumns: string[] = ['idPessoal', 'nome', 'marca', 'cor', 'fornecedor', 'quantidade' ,'acoes'];
  produtos: Observable<Produto[]>;
  marcas: Observable<Marca[]>;
  dataSource;
  


  constructor(
    private firestore: AngularFirestore,
    private produtoService: ProdutosService
    ) { }

  ngOnInit(): void {

    this.produtos = this.produtoService.getObservable();
    this.dataSource = this.produtos;
  }

  async deletar(produto: Produto) {

    await this.produtoService.delete(produto);
  }

}
