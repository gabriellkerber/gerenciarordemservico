import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';
import { idProduto } from '../models/idProduto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Produto [] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

    async adicionar(dados){
      await this.firestore.collection('Produtos').doc(dados.codigo).set(dados);
      this.atualizarLista();
    }

    atualizarLista(){
      this.firestore.collection<Produto>('Produtos').get()
      .toPromise()
      .then(documentData => {
  
  
        this.produtos = documentData.docs.map(doc =>{ 
          return {
            id: doc.id, ...doc.data()
          } as Produto;
        });
  
      }).catch(error => {
      });
    }
    getObservable(): Observable<Produto[]>{
      return this.firestore.collection<Produto>('Produtos',
      ref => ref.orderBy('nome')
      ).valueChanges({ idField: 'id'});
    }

    async delete(cliente: Produto): Promise<void>{
      await this.firestore.collection('Produtos').doc(cliente.id).delete();
    }

    async update(id: string, produto: Produto): Promise<void> {

      await this.firestore.collection<Produto>('Produtos').doc(id).update(produto);
  
  }
  async get(id: string): Promise<Produto>{
    const doc =  await this.firestore.collection<Produto>('Produtos').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Produto;
  }
}
