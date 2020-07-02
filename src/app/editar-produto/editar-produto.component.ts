import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';
import { ProdutosService } from '../Services/produtos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {

  idProduto: string;

  formulario = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    marca: new FormControl(null, [Validators.required]),
    fornecedor: new FormControl(null, [Validators.required]),
    cor: new FormControl(null, [Validators.required]),
    quantidade: new FormControl(null, [Validators.required])
  });

  produto: Produto;

  constructor(
    private firestore: AngularFirestore,
    private produtoService: ProdutosService,
    private snackBar: MatSnackBar,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  async ngOnInit(){
    // this.clienteService.atualizarLista();
    this.idProduto = this.activedRoute.snapshot.paramMap.get('id');
    this.produto = await this.produtoService.get(this.idProduto);

    this.formulario.patchValue(this.produto);
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.produtoService.update(this.idProduto, dados);
    this.formulario.reset();
    await this.snackBar.open(`${"Produto"} ${this.produto.nome} ${"editado com Sucesso!"}`);
    this.router.navigate(["/Buscar/Produto"]);
  }
}