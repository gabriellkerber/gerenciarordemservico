import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../Services/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';

export class Imagem {
  url: string;
  arquivo: File;
}

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.scss']
})
export class DialogPhotoComponent implements OnInit {

  carregando: boolean;
  idProduto: string;
  imagens: Imagem[] = [];
  descricaoProduto: string;

  constructor(
    private produtoService: ProdutosService,
    private actvitedRoute: ActivatedRoute,
    private router: Router
    ) { }

  async ngOnInit(){


      // this.carregando = true;

      // this.idProduto = this.actvitedRoute.snapshot.paramMap.get('id');

      // const produto = await this.produtoService.get(this.idProduto);

      // this.descricaoProduto = `${produto.nome} - ${produto.descricao}`;

      // if (produto.imagens) {

      //   console.log(produto.imagens)
      //     this.imagens = produto.imagens.map<Imagem>(urlImagem => {
      //         return { url: urlImagem, arquivo: null };
      //     });

      // }

      this.carregando = false;

  }

  adicionarImagens(event: any) {

      const arquivos = event.target.files as FileList;

      for (let index = 0; index < arquivos.length; index++) {
        const arquivo = arquivos[index];
        
        this.imagens.push({url: null, arquivo });

      }

  }

  async atualizarImagens() {

    const imagensProduto = this.imagens.filter(x => x.url).map(x => x.url);
    console.log(imagensProduto);
    const produto = { imagens: imagensProduto } as Produto;

    await this.produtoService.update(this.idProduto, produto);
    await this.router.navigateByUrl('/home/produtos')

  }

  async excluirImagem(imagem: Imagem){

    const indice = this.imagens.indexOf(imagem);
    // o splice retorna um array doque foi removido
    this.imagens.splice(indice , 1);
    this.atualizarImagens();
  }
}