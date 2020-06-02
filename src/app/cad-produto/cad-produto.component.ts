import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from '../models/produto.model';
import { ProdutosService } from '../Services/produtos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';
import { MarcasService } from '../Services/marcas.service';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.scss']
})
export class CadProdutoComponent implements OnInit {

  marcas: Observable<Marca[]>;

  formulario = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    marca: new FormControl(null, [Validators.required]),
    fornecedor: new FormControl(null, [Validators.required]),
    cor: new FormControl(null, [Validators.required]),
  });

  produto: Produto;

  constructor(
    private firestore: AngularFirestore,
    private produtosService: ProdutosService,
    private snackBar: MatSnackBar,
    private marcasService: MarcasService
    ) { }

  ngOnInit(): void {
    this.marcas = this.marcasService.getObservable();
    this.produtosService.atualizarLista();
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.produtosService.adicionar(dados);
    this.formulario.reset();
    await this.snackBar.open('Novo Produto cadastrado com Sucesso!');
  }
}
